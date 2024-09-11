const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  branchName: { type: String, required: true },
  floorNo: { type: String, required: true },
  roomNo: { type: String, required: true },
  personNo: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  order: { type: Number },
  image: { type: String },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
