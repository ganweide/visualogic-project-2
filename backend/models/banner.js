const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  image_data_url: { type: String, required: true },
  startdate: { type: Date },
  enddate: { type: Date },
  status_active: { type: Boolean, required: true },
  allways: { type: Boolean, required: true },
  sortorder: { type: Number, default: 1 },
});

const Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;
