const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    videoUrl: {
      type: String,
      required: true,
    },

    imageKitFileId: {
      type: String,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reel', reelSchema);
