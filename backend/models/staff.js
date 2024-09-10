const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  branch: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  role: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String },
  fullName: { type: String, required: true },
  NRIC: { type: String },
  religion: { type: String },
  mobileNumber: { type: String, required: true },
  maritalStatus: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
  currentAddress: { type: String },
  bankName: { type: String },
  accountNumber: { type: String },
  EPFONumber: { type: String },
  SOCSNumber: { type: String },
  incomeTaxNumber: { type: String },
  emergencyContactName: { type: String },
  emergencyRelation: { type: String },
  emergencyContact: { type: String },
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
