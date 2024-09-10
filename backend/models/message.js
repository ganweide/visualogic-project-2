const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  messageType: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String },
  alwaysCheckbox: { type: Boolean, default: false },
  displayStartDate: { type: Date, required: true },
  displayEndDate: { type: Date, required: true },
  order: { type: String, required: true },
  activeSwitch: { type: Boolean, default: true},
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
