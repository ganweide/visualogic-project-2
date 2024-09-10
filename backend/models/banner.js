const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: { type: String },
  alwaysCheckbox: { type: Boolean, default: false },
  displayStartDate: { type: Date, required: true },
  displayEndDate: { type: Date, required: true },
  order: { type: String, required: true },
  activeSwitch: { type: Boolean, default: true},
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
