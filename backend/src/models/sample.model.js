const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;

