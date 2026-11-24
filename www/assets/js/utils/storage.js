/**
 * Storage Utility
 * Phase 1: SessionStorage only (clears on tab close)
 * Phase 2+: Can integrate Capacitor Preferences for persistent storage
 */

export const storage = {
  /**
   * Save outfit to session memory
   * Phase 2+: Can add Preferences.set() for persistent storage
   */
  saveOutfit(outfitData) {
    sessionStorage.setItem('lastOutfit_' + Date.now(), JSON.stringify(outfitData));
    console.log('Outfit saved to session');
  },

  /**
   * Load all saved outfits from this session
   */
  loadOutfits() {
    const outfits = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('lastOutfit_')) {
        outfits.push(JSON.parse(sessionStorage.getItem(key)));
      }
    }
    return outfits;
  },

  /**
   * Save wardrobe items (Phase 2+)
   * Currently session-only; could persist with Preferences
   */
  saveWardrobe(items) {
    sessionStorage.setItem('wardrobe', JSON.stringify(items));
  },

  /**
   * Load wardrobe items
   */
  loadWardrobe() {
    const data = sessionStorage.getItem('wardrobe');
    return data ? JSON.parse(data) : [];
  },

  /**
   * Clear all session data
   * Called by endSession() button
   */
  clearAll() {
    sessionStorage.clear();
    console.log('All session data cleared');
  },

  /**
   * Check if data exists (for phase 2+ multi-session support)
   */
  hasMultiSessionSupport() {
    // Phase 1: false
    // Phase 2+: true (after adding Preferences)
    return false;
  }
};

export default storage;
