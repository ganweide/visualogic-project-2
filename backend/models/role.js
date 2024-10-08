const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  adminRoleView: { type: Boolean, default: false },
  adminRoleCreate: { type: Boolean, default: false },
  adminRoleUpdate: { type: Boolean, default: false },
  adminBannerView: { type: Boolean, default: false },
  adminBannerCreate: { type: Boolean, default: false },
  adminBannerUpdate: { type: Boolean, default: false },
  adminMessageView: { type: Boolean, default: false },
  adminMessageCreate: { type: Boolean, default: false },
  adminMessageUpdate: { type: Boolean, default: false },
  adminStaffView: { type: Boolean, default: false },
  adminStaffCreate: { type: Boolean, default: false },
  adminStaffUpdate: { type: Boolean, default: false },
  adminBranchView: { type: Boolean, default: false },
  adminBranchCreate: { type: Boolean, default: false },
  adminBranchUpdate: { type: Boolean, default: false },
  adminRoomView: { type: Boolean, default: false },
  adminRoomCreate: { type: Boolean, default: false },
  adminRoomUpdate: { type: Boolean, default: false },
  adminPackageView: { type: Boolean, default: false },
  adminPackageCreate: { type: Boolean, default: false },
  adminPackageUpdate: { type: Boolean, default: false },
  adminMemberView: { type: Boolean, default: false },
  adminMemberCreate: { type: Boolean, default: false },
  adminMemberUpdate: { type: Boolean, default: false },
  adminBookingView: { type: Boolean, default: false },
  adminBookingCreate: { type: Boolean, default: false },
  adminBookingUpdate: { type: Boolean, default: false },
  memberCheckInView: { type: Boolean, default: false },
  memberCheckInCreate: { type: Boolean, default: false },
  memberCheckInUpdate: { type: Boolean, default: false },
  memberQRView: { type: Boolean, default: false },
  memberQRCreate: { type: Boolean, default: false },
  memberQRUpdate: { type: Boolean, default: false },
  memberStaffView: { type: Boolean, default: false },
  memberStaffCreate: { type: Boolean, default: false },
  memberStaffUpdate: { type: Boolean, default: false },
  financePurchaseView: { type: Boolean, default: false },
  financePurchaseCreate: { type: Boolean, default: false },
  financePurchaseUpdate: { type: Boolean, default: false },
  financeCheckInView: { type: Boolean, default: false },
  financeCheckInCreate: { type: Boolean, default: false },
  financeCheckInUpdate: { type: Boolean, default: false },
  financeAttendanceView: { type: Boolean, default: false },
  financeAttendanceCreate: { type: Boolean, default: false },
  financeAttendanceUpdate: { type: Boolean, default: false },
  roleName: { type: String, required: true, unique: true },
  branchName: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
  allBranchStatus: { type: Boolean, required: true },
  roleStatus: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

roleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Soft delete method
roleSchema.methods.softDelete = function() {
  this.deletedAt = Date.now();
  return this.save();
};

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
