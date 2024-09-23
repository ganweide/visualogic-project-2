// added by eyna

const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  PD_select_member: { type: mongoose.Schema.Types.ObjectId, ref: 'Members', required: true },
  PD_select_branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  PD_select_payment_mode: { 
    type: String, 
    enum: ['Cash', 'Credit/Debit Card'],
    required: true },
  PD_select_package_plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
 });

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;
