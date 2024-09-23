// added by eyna

const mongoose = require('mongoose');

const bookingsCheckinSchema = new mongoose.Schema({
    BC_booking_date: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    BC_package_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    BC_member_name: { type: mongoose.Schema.Types.ObjectId, ref: 'Members', required: true },
    BC_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    BC_floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor', required: true },
    BC_room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    BC_time: { type: String, required: true },
    BC_pax: { type: Number, required: true },
    BC_status: { 
        type: String, 
        enum: ['Booked', 'Cancel', 'CheckIn', 'Not Show Up'],
        required: true },
    BC_checkin_date: { type: Date },
 });

const BookingsCheckin = mongoose.model('Bookings Checkin', bookingsCheckinSchema);

module.exports = BookingsCheckin;
