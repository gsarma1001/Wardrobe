/**
 * Closet Page Module
 * Handles adding and managing clothing items
 * Phase 1: File upload with crop preview
 * Phase 2+: Native camera + photo gallery
 */

export function initClosetPage() {
  const closet = document.getElementById('closet');
  const photo = document.getElementById('photo');
  const preview = document.getElementById('preview');
  const items = window.wardrobe.items; // Shared state

  closet.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(closet);
    const name = data.get('itemName').trim();
    
    if (!name) {
      closet.elements.itemName.focus();
      return;
    }

    // Add item with photo (if selected)
    const item = {
      id: Date.now(),
      name,
      category: data.get('category'),
      style: ['Casual', 'Dressy casual', 'Formal'].indexOf(data.get('style')),
      photo: window.wardrobe.selectedPhoto
    };

    items.push(item);
    renderCloset(items);
    
    // Reset form
    window.wardrobe.selectedPhoto = '';
    preview.src = '';
    preview.hidden = true;
    closet.reset();
    photo.value = '';

    // Update status
    document.getElementById('status').textContent = name + ' added.';
    closet.elements.itemName.focus();
  });

  // Setup photo handling
  photo.addEventListener('change', () => {
    if (window.wardrobe.selectedPhoto && window.wardrobe.selectedPhoto.startsWith('blob:')) {
      URL.revokeObjectURL(window.wardrobe.selectedPhoto);
    }
    
    if (photo.files[0]) {
      const url = URL.createObjectURL(photo.files[0]);
      window.wardrobe.openCropModal(url);
    }
  });

  renderCloset(items);
}

function renderCloset(items) {
  const itemsList = document.getElementById('items');
  const emptyMessage = document.getElementById('empty');

  emptyMessage.hidden = items.length > 0;
  itemsList.replaceChildren(...items.map(item => {
    const node = document.createElement('li');
    node.className = '';
    
    if (item.photo) {
      const img = document.createElement('img');
      img.src = item.photo;
      img.alt = '';
      node.append(img);
    }
    
    node.append(createElement('strong', item.name));
    
    const removeBtn = createElement('button', 'Remove');
    removeBtn.className = 'secondary';
    removeBtn.setAttribute('aria-label', 'Remove ' + item.name);
    removeBtn.addEventListener('click', () => removeItem(item, items));
    
    node.append(createElement('div', item.category), removeBtn);
    return node;
  }));
}

function removeItem(item, items) {
  const index = items.indexOf(item);
  if (index > -1) items.splice(index, 1);
  
  if (item.photo && item.photo.startsWith('blob:')) {
    URL.revokeObjectURL(item.photo);
  }
  
  renderCloset(items);
  document.getElementById('status').textContent = item.name + ' removed.';
}

function createElement(tag, content) {
  const node = document.createElement(tag);
  node.textContent = content;
  return node;
}

export { renderCloset };
