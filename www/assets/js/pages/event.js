/**
 * Event Page Module
 * Handles event description and outfit generation
 */

export function initEventPage() {
  const eventForm = document.getElementById('event');
  const statusEl = document.getElementById('status');

  // Event prompt buttons
  document.querySelectorAll('.event-prompt').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      eventForm.elements.occasion.value = btn.dataset.event;
      eventForm.elements.occasion.focus();
    });
  });

  eventForm.addEventListener('input', () => {
    clearResults();
  });

  eventForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearResults();

    const data = new FormData(eventForm);
    const description = data.get('occasion').trim();

    if (!description) {
      statusEl.textContent = 'Describe the event first.';
      eventForm.elements.occasion.focus();
      return;
    }

    const items = window.wardrobe.items;
    if (items.length === 0) {
      statusEl.textContent = 'Add some clothing items first.';
      return;
    }

    // Generate outfits using the engine
    const ideas = window.wardrobe.outfitEngine.generateOutfits(
      items,
      description,
      ['Casual', 'Dressy casual', 'Formal'].indexOf(data.get('dressCode'))
    );

    if (!ideas.outfits || ideas.outfits.length === 0) {
      statusEl.textContent = 'Add a dress, jumpsuit, or both a top and bottom to get outfit ideas.';
      return;
    }

    showOutfits(ideas);
    
    const budget = Number(data.get('budget'));
    if (budget > 0) {
      showShoppingLinks(ideas, budget);
    }

    statusEl.textContent = ideas.outfits.length + (ideas.outfits.length === 1 ? ' outfit ready.' : ' outfits ready.');
    document.getElementById('results-title').tabIndex = -1;
    document.getElementById('results-title').focus();
  });
}

function showOutfits(ideas) {
  const resultsSection = document.getElementById('results');
  const outfitsContainer = document.getElementById('outfits');
  const styles = ['Casual', 'Dressy casual', 'Formal'];

  outfitsContainer.replaceChildren(...ideas.outfits.map((outfit, index) => {
    const card = document.createElement('article');
    const list = document.createElement('ul');
    list.className = 'tiles';

    list.append(...outfit.pieces.map(item => {
      const li = document.createElement('li');
      
      if (item.photo) {
        const img = document.createElement('img');
        img.src = item.photo;
        img.alt = '';
        li.append(img);
      }
      
      li.append(createEl('strong', item.name));
      return li;
    }));

    const fit = styles[ideas.target].toLowerCase();
    const details = [
      outfit.exact 
        ? 'Your main pieces match the ' + fit + ' dress code.'
        : 'These are among your closest matches for a ' + fit + ' outfit.'
    ];

    if (ideas.wantsLayers && ideas.layer) {
      details.push('The extra layer helps in cooler weather.');
    }
    if (ideas.wantsLayers && !ideas.layer) {
      details.push('Check whether you have a layer for cooler weather.');
    }
    if (!ideas.shoe) {
      details.push(ideas.wantsSneakers ? 'Add sneakers to complete this look.' : 'Choose shoes to complete this look.');
    }

    card.append(createEl('h3', 'Outfit ' + (index + 1)), list, createEl('p', details.join(' ')));
    return card;
  }));

  resultsSection.hidden = false;
}

function showShoppingLinks(ideas, budget) {
  const shoppingEl = document.getElementById('shopping');
  const accessory = !ideas.shoe 
    ? (ideas.wantsSneakers ? 'sneakers' : 'flat dress shoes') 
    : 'simple outfit accessories';

  const link = document.createElement('a');
  link.href = 'https://www.google.com/search?tbm=shop&q=' + encodeURIComponent(accessory + ' under $' + budget);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Search for ' + accessory + ' under $' + budget;

  shoppingEl.replaceChildren(link, document.createTextNode('. Check prices and availability on the retailer\'s site.'));
  shoppingEl.hidden = false;
}

function clearResults() {
  document.getElementById('results').hidden = true;
  document.getElementById('outfits').replaceChildren();
  document.getElementById('shopping').replaceChildren();
  document.getElementById('shopping').hidden = true;
}

function createEl(tag, content) {
  const node = document.createElement(tag);
  node.textContent = content;
  return node;
}

export { clearResults, showOutfits };
