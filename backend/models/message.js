const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: { type: JSON, required: true },
  messageType: { type: String, required: true },
  messageImageUrl: { type: String },
  messageImageDataUrl: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  messageStatus: { type: Boolean, required: true },
  alwaysStatus: { type: Boolean, required: true },
  messageOrder: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

messageSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
messageSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
