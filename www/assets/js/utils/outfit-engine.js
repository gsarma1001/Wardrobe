/**
 * Outfit Recommendation Engine
 * Rules-based recommendations based on event description and preferences
 */

export const outfitEngine = {
  generateOutfits(items, description, dressCode) {
    // Determine target formality level
    const target = dressCode !== -1 ? dressCode
      : /\b(prom|formal|black tie)\b/i.test(description) ? 2
      : /\b(banquet|homecoming|graduation|grad party|performance)\b/i.test(description) ? 1
      : 0;

    // Parse preferences from description
    const wantsLayers = /\b(cold|chilly|layers|jacket)\b/i.test(description);
    const wantsSneakers = /\b(sneakers|trainers)\b/i.test(description);
    const noHeels = /\b(no|without|avoid)\s+heels\b/i.test(description);

    // Filter items by category
    const byCategory = (category) => items.filter(item => item.category === category);
    const ranked = (candidates) => 
      [...candidates].sort((a, b) => Math.abs(a.style - target) - Math.abs(b.style - target));

    // Find shoes (respecting heel preference)
    const allShoes = byCategory('Shoes');
    const shoes = allShoes.filter(item => 
      !noHeels || !/\b(heels?|pumps?|stilettos?|wedges?)\b/i.test(item.name)
    );
    const sneakers = shoes.filter(item => /\b(sneakers|trainers)\b/i.test(item.name));
    const shoe = ranked(wantsSneakers ? sneakers : shoes)[0];

    // Find layers for cold weather
    const layer = wantsLayers ? ranked(byCategory('Layer'))[0] : undefined;

    // Find accessories
    const accessory = ranked(byCategory('Accessory'))[0];

    // Generate base combinations (dress or top+bottom)
    const bases = byCategory('Dress or jumpsuit').map(item => [item]);
    for (const top of byCategory('Top')) {
      for (const bottom of byCategory('Bottom')) {
        bases.push([top, bottom]);
      }
    }

    // Score combinations by how close they match target formality
    const score = (base) => 
      base.reduce((sum, item) => sum + Math.abs(item.style - target), 0) / base.length;

    // Return top 3 outfits
    return {
      target,
      wantsLayers,
      wantsSneakers,
      layer,
      shoe,
      outfits: bases
        .sort((a, b) => score(a) - score(b))
        .slice(0, 3)
        .map(base => ({
          exact: score(base) === 0,
          pieces: [...base, layer, shoe, accessory].filter(Boolean)
        }))
    };
  }
};

export default outfitEngine;
