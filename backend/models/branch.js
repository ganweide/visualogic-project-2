const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  areaName: { type: String, required: true },
  branchName: { type: String, required: true },
  branchCode: { type: String, required: true, unique: true },
  whatsappNo: { type: String, required: true },
  paymentSecretKey: { type: String, required: true },
  startOperatingHours: { type: String, required: true },
  endOperatingHours: { type: String, required: true },
  address: { type: String, required: true },
  googleLink: { type: String },
  wazeLink: { type: String },
  contact: { type: String },
  order: { type: Number },
  hqSwitch: { type: Boolean, default: false },
  taxSwitch: { type: Boolean, default: false },
  qrCode: { type: String },
  activeSwitch: { type: Boolean, default: true }
});

branchSchema.pre('save', async function (next) {
  if (this.isNew) { // Only set order for new documents
    try {
      // Find the branch with the highest order value
      const lastBranch = await this.constructor.findOne().sort({ order: -1 });
      // Set the order value to the next number
      this.order = lastBranch ? lastBranch.order + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
