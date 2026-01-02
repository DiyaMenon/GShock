const Reel = require('../models/reel.model');
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Get all reels
async function getReels(req, res) {
  try {
    const reels = await Reel.find().sort({ displayOrder: 1, createdAt: -1 });
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Get active reels only
async function getActiveReels(req, res) {
  try {
    const reels = await Reel.find({ isActive: true }).sort({ displayOrder: 1 }).limit(3);
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Create reel with video upload
async function createReel(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Check if file is a video
    if (!req.file.mimetype.startsWith('video')) {
      return res.status(400).json({ message: 'File must be a video' });
    }

    const buffer = req.file.buffer;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Upload to ImageKit
    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: req.file.originalname,
      folder: '/gshock/reels/',
      fileId: `reel-${Date.now()}`,
    });

    // Create reel in database
    const reel = await Reel.create({
      title,
      description: description || '',
      videoUrl: uploadResult.url,
      imageKitFileId: uploadResult.fileId,
      isActive: true,
      displayOrder: 0,
    });

    res.status(201).json(reel);
  } catch (error) {
    console.error('Reel creation error:', error);
    res.status(500).json({ message: 'Failed to create reel', error: error.message });
  }
}

// Update reel (title, description, display order, active status)
async function updateReel(req, res) {
  try {
    const { title, description, isActive, displayOrder } = req.body;
    const { id } = req.params;

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (displayOrder !== undefined) updateData.displayOrder = displayOrder;

    const reel = await Reel.findByIdAndUpdate(id, updateData, { new: true });
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    res.status(200).json(reel);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Delete reel and remove from ImageKit
async function deleteReel(req, res) {
  try {
    const { id } = req.params;

    const reel = await Reel.findByIdAndDelete(id);
    if (!reel) {
      return res.status(404).json({ message: 'Reel not found' });
    }

    // Delete from ImageKit if fileId exists
    if (reel.imageKitFileId) {
      try {
        await imagekit.deleteFile(reel.imageKitFileId);
      } catch (ikError) {
        console.error('ImageKit deletion error:', ikError);
        // Continue even if ImageKit deletion fails
      }
    }

    res.status(200).json({ message: 'Reel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

// Update active reels selection (set which 3 reels to display)
async function updateActiveReels(req, res) {
  try {
    const { reelIds } = req.body; // Array of 3 reel IDs

    if (!Array.isArray(reelIds) || reelIds.length < 3) {
      return res.status(400).json({ message: 'Exactly 3 reels must be selected' });
    }

    // Deactivate all reels
    await Reel.updateMany({}, { isActive: false });

    // Activate only the selected reels with display order
    for (let i = 0; i < reelIds.length; i++) {
      await Reel.findByIdAndUpdate(reelIds[i], {
        isActive: true,
        displayOrder: i,
      });
    }

    const activeReels = await Reel.find({ isActive: true }).sort({ displayOrder: 1 });
    res.status(200).json(activeReels);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = {
  getReels,
  getActiveReels,
  createReel,
  updateReel,
  deleteReel,
  updateActiveReels,
};
