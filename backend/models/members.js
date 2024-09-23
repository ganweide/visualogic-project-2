// added by eyna

const mongoose = require('mongoose');

const membersSchema = new mongoose.Schema({
    MB_registration_date: { type: Date, required: true },
    MB_status_new: { type: Boolean, required: true },
    MB_preferred_branch: { 
        type: String, 
        enum: ['Cheras', 'Kepong'], 
        required: true },  
    MB_payment_method: { 
        type: String, 
        enum: ['One-off', 'Installment'],
        required: true },    
    MB_full_name: { type: String, required: true },
    MB_preferred_name: { type: String, required: true },
    MB_chinese_name: { type: String, required: true },
    MB_IC_number: { type: String, required: true },
    MB_dob: { type: Date, required: true },
    MB_age: { type: Number, required: true },
    MB_gender: { 
        type: String, 
        enum: ['Male', 'Female'],
        required: true },    
    MB_address: { type: String, required: true },
    MB_city: { type: String, required: true },
    MB_postcode: { type: Number, required: true },
    MB_states: { type: String, required: true },
    MB_mobile_number: { type: String, required: true },
    MB_email: { type: String, required: true },
    MB_suggested_by: { 
        type: String, 
        enum: ['Family', 'Friend', 'Facebook', 'Advertisement', 'Others', 'Anran Outlet'],
        required: true },  
    MB_MC_medical_history: { type: Boolean, required: true },
    MB_MC_recent_operation: { type: Boolean, required: true },
    MB_MC_severe_heart_disease: { type: Boolean, required: true },
    MB_MC_severe_circulatory_problems: { type: Boolean, required: true },
    MB_MC_cardiac_pacemaker: { type: Boolean, required: true },
    MB_MC_cancer_treatment: { type: Boolean, required: true },
    MB_MC_severe_high_blood_pressure: { type: Boolean, required: true },
    MB_MC_skin_disease: { type: Boolean, required: true },
    MB_MC_viral_infection: { type: Boolean, required: true },
    MB_MC_fever: { type: Boolean, required: true },
    MB_MC_recent_scars: { type: Boolean, required: true },
    MB_MC_pregnancy_during_period: { type: Boolean, required: true },
    MB_MC_none_of_the_above: { type: Boolean, required: true },
    MB_MC_consent: { type: Boolean, required: true },
    MB_EC_name: { type: String, required: true },
    MB_EC_mobile_number: { type: String, required: true },
    MB_EC_relationship: { type: String, required: true },
});

const Members = mongoose.model('Members', membersSchema);

module.exports = Members;
