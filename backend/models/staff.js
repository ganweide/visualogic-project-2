const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  staffCode: { type: String, required: true, unique: true },
  branchName: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  role: { type: String, required: true },
  joinDate: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String },
  fullName: { type: String, required: true },
  NRIC: { type: String },
  religion: { type: String },
  mobileNo: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  currentAddress: { type: String },
  bankName: { type: String },
  accountNo: { type: String },
  EPFONo: { type: String },
  SOCSNo: { type: String },
  incomeTaxNo: { type: String },
  emergencyContactName: { type: String },
  emergencyRelation: { type: String },
  emergencyContact: { type: String },
  activeSwitch: { type: Boolean, default: true},
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
