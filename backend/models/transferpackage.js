// added by eyna

const mongoose = require('mongoose');

const transferPackageSchema = new mongoose.Schema({
    TP_from: { type: Date, required: true },
    TP_old_package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
    TP_to: { type: Date, required: true },
    TP_new_package: { type: mongoose.Schema.Types.ObjectId, ref: 'Package', required: true },
 });

const TransferPackage = mongoose.model('Transfer Package', transferPackageSchema);

module.exports = TransferPackage;
