// added by eyna

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    BK_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    BK_date: { type: Date, required: true },
    BK_day: { 
        type: String, 
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true },
    BK_time: { type: String, required: true },
 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
