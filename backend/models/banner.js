const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  bannerImageUrl: { type: String, required: true },
  banneImageDataUrl: { type: String, required: true },
  startDate: { type: Date },
  endDate: { type: Date },
  bannerStatus: { type: Boolean, required: true },
  allwaysStatus: { type: Boolean, required: true },
  bannerOrder: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

bannerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
bannerSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
