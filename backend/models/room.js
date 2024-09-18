const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  branchName: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
  roomNo: { type: String, required: true },
  floorNo: { type: mongoose.Schema.Types.ObjectId, ref: 'floor' },
  roomPersonNo: { type: Number, required: true },
  roomFloorPlan: { type: String },
  rommFloorUrl: { type: String },
  roomGender: { type: String },
  roomOrder: { type: Number, default: 1 },
  roomStatus: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

roomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
roomSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
