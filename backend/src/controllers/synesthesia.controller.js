const Menu = require('../models/menu.model');
const Artwork = require('../models/artwork.model');

const VIBE_CONFIG = {
  bold: {
    menuTags: ['bold', 'strong', 'robusta', 'intense', 'spicy', 'dark', 'bitter'],
    artTags: ['abstract', 'bold', 'chaotic', 'high_contrast', 'urban', 'dark'],
    reasoning: "The intense profile of this selection mirrors the high-contrast, bold strokes of the artwork. A pairing for those who seek clarity in chaos."
  },
  smooth: {
    menuTags: ['smooth', 'mild', 'creamy', 'sweet', 'milk', 'comfort', 'light'],
    artTags: ['minimalist', 'soft', 'calm', 'pastel', 'modern', 'simple'],
    reasoning: "Velvety textures on the palate complement the soft gradients on the canvas. A low-arousal pairing designed for contemplation and slow living."
  },
  earthy: {
    menuTags: ['earthy', 'nutty', 'herbal', 'rustic', 'traditional', 'mushroom', 'savory'],
    artTags: ['nature', 'landscape', 'organic', 'green', 'texture', 'brown'],
    reasoning: "Rooted flavors meet organic visuals. The earthy notes ground the sensory experience, echoing the natural elements in the art."
  }
};

async function getPairing(req, res) {
  try {
    // 1. Inputs
    const { vibe, type = 'both', excludeMenuId, excludeArtId } = req.query;
    const config = VIBE_CONFIG[vibe] || VIBE_CONFIG['bold'];

    let finalMenu = null;
    let finalArt = null;

    // 2. Fetch Coffee/Menu Item
    if (type === 'both' || type === 'coffee') {
      const matchStage = {
        stockStatus: 'In Stock',
        isAvailable: true, // Double check boolean flag
        tags: { $in: config.menuTags }
      };

      // Exclude current item if requesting a shuffle
      if (excludeMenuId) {
        matchStage._id = { $ne: excludeMenuId }; // excludeMenuId will be cast to ObjectId by Mongoose/Mongo
      }

      const menuResult = await Menu.aggregate([
        { $match: matchStage },
        { $sample: { size: 1 } }
      ]);
      
      // Fallback: If shuffle excluded the only item, or no specific tags found,
      // try finding ANY valid item (excluding the one we are trying to swap away from)
      if (!menuResult.length) {
         const fallbackQuery = { stockStatus: 'In Stock', isAvailable: true };
         if (excludeMenuId) fallbackQuery._id = { $ne: excludeMenuId };
         finalMenu = await Menu.findOne(fallbackQuery);
      } else {
         finalMenu = menuResult[0];
      }
    }

    // 3. Fetch Artwork
    if (type === 'both' || type === 'art') {
      const matchStage = {
        // Allow 'Available' OR 'Limited Edition'
        status: { $in: ['Available', 'Limited Edition'] },
        isAvailable: true,
        tags: { $in: config.artTags }
      };

      if (excludeArtId) {
        matchStage._id = { $ne: excludeArtId };
      }

      const artResult = await Artwork.aggregate([
        { $match: matchStage },
        { $sample: { size: 1 } }
      ]);

      if (!artResult.length) {
         const fallbackQuery = { 
           status: { $in: ['Available', 'Limited Edition'] }, 
           isAvailable: true 
         };
         if (excludeArtId) fallbackQuery._id = { $ne: excludeArtId };
         finalArt = await Artwork.findOne(fallbackQuery);
      } else {
         finalArt = artResult[0];
      }
    }

    // 4. Send Response
    res.status(200).json({
      coffee: finalMenu,
      art: finalArt,
      reasoning: config.reasoning
    });

  } catch (error) {
    console.error("Synesthesia Error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { getPairing };