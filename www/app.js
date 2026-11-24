'use strict';

const $ = id => document.getElementById(id);
const items = [];
let source = null;
let sourceUrl = '';
let assessment = null;
let pending = null;
let generation = 0;

function clearSource() {
  if (sourceUrl) URL.revokeObjectURL(sourceUrl);
  sourceUrl = '';
  source = null;
  $('photo').value = '';
  $('crop').hidden = true;
  $('crop-preview').width = 0;
  $('crop-preview').height = 0;
  $('crop-status').textContent = '';
}

function invalidate() {
  generation++;
  if (pending) pending.abort();
  pending = null;
  assessment = null;
  $('result').hidden = true;
  $('shopping').hidden = true;
  $('offers').replaceChildren();
  $('accepted').textContent = '';
  $('status').textContent = '';
  $('shopping-status').textContent = '';
}

function cropBounds() {
  const left = Number($('left').value);
  const right = Number($('right').value);
  const top = Number($('top').value);
  const bottom = Number($('bottom').value);
  return { left, right, top, bottom, valid: right > left && bottom > top };
}

function drawCrop() {
  if (!source) return false;
  const bounds = cropBounds();
  if (!bounds.valid) {
    $('crop-status').textContent = 'The right and bottom edges must be after the left and top edges.';
    $('crop-preview').width = 0;
    $('crop-preview').height = 0;
    return false;
  }
  const x = Math.floor(source.naturalWidth * bounds.left / 100);
  const y = Math.floor(source.naturalHeight * bounds.top / 100);
  const width = Math.max(1, Math.floor(source.naturalWidth * bounds.right / 100) - x);
  const height = Math.max(1, Math.floor(source.naturalHeight * bounds.bottom / 100) - y);
  const scale = Math.min(1, 1280 / Math.max(width, height));
  const canvas = $('crop-preview');
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  canvas.getContext('2d').drawImage(source, x, y, width, height, 0, 0, canvas.width, canvas.height);
  $('crop-status').textContent = 'Preview shows the area that will be sent if you give consent.';
  return true;
}

$('photo').addEventListener('change', () => {
  const file = $('photo').files[0];
  if (sourceUrl) URL.revokeObjectURL(sourceUrl);
  source = null;
  sourceUrl = '';
  $('crop').hidden = true;
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
    $('status').textContent = 'Choose a JPEG, PNG or WebP image up to 5 MB.';
    $('photo').value = '';
    return;
  }
  const url = URL.createObjectURL(file);
  sourceUrl = url;
  const image = new Image();
  image.onload = () => {
    if (sourceUrl !== url) return;
    source = image;
    for (const [id, value] of [['left', 0], ['right', 100], ['top', 0], ['bottom', 100]]) $(id).value = value;
    $('crop').hidden = false;
    drawCrop();
  };
  image.onerror = () => {
    if (sourceUrl !== url) return;
    clearSource();
    $('status').textContent = 'Could not read that photo. Please choose another image.';
  };
  image.src = url;
});

for (const id of ['left', 'right', 'top', 'bottom']) $(id).addEventListener('input', drawCrop);
$('remove-photo').addEventListener('click', clearSource);

function renderItems() {
  $('items').replaceChildren(...items.map((item, index) => {
    const li = document.createElement('li');
    if (item.photo) {
      const img = document.createElement('img');
      img.src = item.photo;
      img.alt = '';
      li.append(img);
    }
    const name = document.createElement('p');
    name.textContent = item.description;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'secondary';
    remove.textContent = 'Remove';
    remove.setAttribute('aria-label', 'Remove ' + item.description);
    remove.addEventListener('click', () => {
      items.splice(index, 1);
      invalidate();
      renderItems();
    });
    li.append(name, remove);
    return li;
  }));
}

$('item-form').addEventListener('submit', event => {
  event.preventDefault();
  let description = $('description').value.trim();
  if (!description && !source && !$('photo').files.length) {
    $('status').textContent = 'Add a photo or describe the clothing piece.';
    return;
  }
  if (items.length >= 8) {
    $('status').textContent = 'Add up to eight pieces per outfit.';
    return;
  }
  if ($('photo').files.length && !source) {
    $('status').textContent = 'Wait for the photo preview or remove the photo.';
    return;
  }
  if (source && !drawCrop()) return;
  if (!description) description = 'Clothing piece ' + (items.length + 1);
  const photo = source ? $('crop-preview').toDataURL('image/jpeg', 0.85) : null;
  items.push({ description, photo });
  clearSource();
  $('item-form').reset();
  invalidate();
  renderItems();
  $('status').textContent = 'Piece added.';
  $('description').focus();
});

$('occasion').addEventListener('input', invalidate);
$('consent').addEventListener('change', invalidate);

async function post(path, body) {
  pending = new AbortController();
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: pending.signal
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The request failed.');
  return result;
}

$('assessment-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (!items.length) {
    $('status').textContent = 'Add at least one piece first.';
    return;
  }
  invalidate();
  const current = generation;
  $('status').textContent = 'Assessing your outfit...';
  try {
    const result = await post('/api/assess', {
      items, occasion: $('occasion').value.trim(), consent: $('consent').checked
    });
    if (generation !== current) return;
    assessment = result;
    $('score').textContent = result.score === null ? 'Unable to score' : result.score + '% match';
    $('explanation').textContent = result.explanation;
    $('decision').hidden = result.score === null;
    $('accept').hidden = result.score === null || result.score < 80;
    $('decision-message').textContent = result.score >= 80
      ? 'This looks suitable for your event. Accept it or look for alternatives?'
      : 'This outfit may not fit the event. You can look for alternatives or borrow from a friend.';
    $('result').hidden = false;
    $('status').textContent = 'Assessment complete.';
    $('result-heading').focus();
  } catch (error) {
    if (error.name !== 'AbortError' && generation === current) $('status').textContent = error.message;
  } finally {
    if (generation === current) pending = null;
  }
});

$('accept').addEventListener('click', () => {
  generation++;
  if (pending) pending.abort();
  pending = null;
  $('shopping').hidden = true;
  $('accepted').textContent = 'Outfit accepted for this session.';
});
$('shop').addEventListener('click', () => {
  $('accepted').textContent = '';
  $('shopping').hidden = false;
  $('budget').focus();
});

$('shopping-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (!assessment || assessment.score === null) return;
  const budget = Number($('budget').value);
  if (!Number.isFinite(budget) || budget <= 0 || budget > 10000) {
    $('shopping-status').textContent = 'Enter a budget between $0.01 and $10,000.';
    return;
  }
  if (pending) pending.abort();
  const current = ++generation;
  $('offers').replaceChildren();
  $('shopping-status').textContent = 'Searching and assessing offers...';
  try {
    const result = await post('/api/shop', {
      occasion: $('occasion').value.trim(),
      items: items.map(item => item.description),
      assessment: assessment.summary,
      category: assessment.category,
      budget,
      consent: $('consent').checked
    });
    if (generation !== current) return;
    if (!result.offers.length) {
      $('shopping-status').textContent = 'No qualifying offers were found in the results searched. You may be able to borrow from a friend for this occasion.';
      return;
    }
    $('shopping-status').textContent = 'Options found. Prices and availability can change.';
    $('offers').replaceChildren(...result.offers.map(offer => {
      const li = document.createElement('li');
      const title = document.createElement('strong');
      title.textContent = offer.title;
      const detail = document.createElement('p');
      detail.textContent = offer.retailer + ' via Google Shopping — $' + offer.price.toFixed(2) + ' — estimated outfit match ' + offer.score + '%. ' + offer.reason;
      const link = document.createElement('a');
      link.href = offer.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'View shopping offer';
      link.addEventListener('click', event => {
        if (!window.confirm('Leave Closet Plan and open this shopping offer? The shopping site has its own privacy policy.')) event.preventDefault();
      });
      li.append(title, detail, link);
      return li;
    }));
  } catch (error) {
    if (error.name !== 'AbortError' && generation === current) $('shopping-status').textContent = error.message;
  } finally {
    if (generation === current) pending = null;
  }
});

function endSession() {
  invalidate();
  items.length = 0;
  clearSource();
  $('item-form').reset();
  $('assessment-form').reset();
  $('shopping-form').reset();
  renderItems();
  $('status').textContent = 'Session cleared.';
}
$('end').addEventListener('click', endSession);
window.addEventListener('pagehide', endSession);
