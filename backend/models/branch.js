const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branchCode: { type: String, required: true },
  branchName: { type: String, required: true },
  areaName: { type: String, required: true },
  branchAddress: { type: String, required: true },
  googleLink: { type: String, required: false },
  wazeLink: { type: String, required: false },
  operatingStart: { type: String, required: true },
  operatingEnd: { type: String, required: true },
  whatsappNo: { type: String, required: true },
  staffName: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  paymentKey: { type: String },
  apiKey: { type: String },
  taxStatus: { type: Boolean, required: true },
  taxPercent: { type: Number },
  branchPercent: { type: Number },
  imageUrl: { type: String },
  imageData: { type: String },
  hqStatus: { type: Boolean, required: true },
  branchOrder: { type: Number, default: 1 },
  branchStatus: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

branchSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
branchSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
