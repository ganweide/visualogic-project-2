// added by eyna

const mongoose = require('mongoose');

const attendanceInfoSchema = new mongoose.Schema({
    AI_date: { type: Date, required: true },
    AI_staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff', required: true },
    AI_present: { type: Boolean, required: true },
 });

const AttendanceInfo = mongoose.model('Attendance Info', attendanceInfoSchema);

module.exports = AttendanceInfo;
