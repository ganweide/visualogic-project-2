const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  packageCode: { type: String, required: true },
  packagePrice: { type: Number, required: true },
  packageCategory: { type: String, required: true },
  packageImageURL: { type: String },
  packageImageData: { type: String },
  packageOrder: { type: Number, required: true },
  packageUnlimitedStatus: { type: Boolean, required: true },
  packageAmount: { type: Number },
  transferableStatus: { type: Boolean, required: true },
  individualPackageStatus: { type: Boolean, required: true },
  packageValidity: { type: String, require: true },
  promotionStatus: { type: Boolean, required: true },
  promotionAmount: { type: Number },
  promotionStartDate: { type: Date},
  promotionEndDate: { type: Date },
  branchName: [{ type: mongoose.Schema.Types.ObjectId, ref: 'branch' }],
  allBranchStatus: { type: Boolean, required: true },
  packageStatus: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

packageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
packageSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
