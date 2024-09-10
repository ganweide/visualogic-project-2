const mongoose = require('mongoose');

const floorSchema = new mongoose.Schema({
  floorNo: { type: String, required: true },
  floorDetail: { type: String, required: true },
  image: { type: String },
  branchName: { type: String, required: true },
  order: { type: String, required: true },
  activeSwitch: { type: Boolean, default: true},
});

const Floor = mongoose.model('Floor', floorSchema);

module.exports = Floor;
