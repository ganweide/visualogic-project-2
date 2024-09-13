const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffName: { type: String, required: true },
  staffCode: { type: String, required: true, unique: true },
  staffGender: { type: String, required: true },
  allBranchStatus: { type: Boolean, required: true },
  branchName: { type: mongoose.Schema.Types.ObjectId, ref: 'branch' },
  roleName: { type: mongoose.Schema.Types.ObjectId, ref: 'roles' },
  staffJoinDate: { type: String, required: true },
  staffUsername: { type: String, required: true, unique: true },
  staffPassword: { type: String, required: true },
  staffStatus: { type: Boolean, required: true },
  staffEmail: { type: String },
  staffPosition: { type: String },
  staffFullName: { type: String },
  staffNRIC: { type: String },
  staffReligion: { type: String },
  staffMobileNo: { type: String },
  staffMartialStatus: { type: String },
  staffCurrentAddress: { type: String },
  bankName: { type: String },
  bankAccountNo: { type: String },
  staffEPF: { type: String },
  staffSOCSO: { type: String },
  staffIncomeTax: { type: String },
  emergencyContactName: { type: String },
  emergencyContactRelation: { type: String },
  emergencyContactNo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
