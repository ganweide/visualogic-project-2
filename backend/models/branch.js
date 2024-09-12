const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branch_code: { type: String, required: true },
  branch_name: { type: String, required: true },
  area_name: { type: String, required: true },
  address: { type: String, required: true },
  google_link: { type: String, required: false },
  waze_link: { type: String, required: false },
  operating_from_hours: { type: Date, required: true, timestamps: true },
  operating_to_hours: { type: Date, required: true, timestamps: true },
  whatsappno: { type: String, required: true },
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'staff' },
  paymentkey: { type: String },
  apikey: { type: String },
  tax: { type: Boolean, required: true },
  tax_percent: { type: Number },
  branch_percent: { type: Number },
  image_url: { type: String },
  image_data: { type: String },
  hqbranch: { type: Boolean, required: true },
  sortorder: { type: Number, default: 1 },
  status_active: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
