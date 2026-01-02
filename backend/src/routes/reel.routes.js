const express = require('express');
const multer = require('multer');
const reelController = require('../controllers/reel.controller');
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require('../middleware/admin.middleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'), false);
    }
  }
});

// Public routes
router.get('/active', reelController.getActiveReels);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, reelController.getReels);
router.post('/', authMiddleware, adminMiddleware, upload.single('video'), reelController.createReel);
router.patch('/:id', authMiddleware, adminMiddleware, reelController.updateReel);
router.delete('/:id', authMiddleware, adminMiddleware, reelController.deleteReel);
router.patch('/selection/update', authMiddleware, adminMiddleware, reelController.updateActiveReels);

module.exports = router;
