const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
  floor_no: { type: String, required: true },
  floor_details: { type: String, required: true },
  floor_plan: { type: String },
  floor_url: { type: String },
  createdAt: { type: Date, default: Date.now },
  sortorder: { type: Number, default: 1 },
  status_active: { type: Boolean, required: true }
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
