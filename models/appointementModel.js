const mongoose = require('mongoose');
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    doctorInfo: {
        type: String,
        required: true
    },
    userInfo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    status: {  // Corrected from 'statue' to 'status'
        type: String,
        required: true,
        default: 'pending'
    },
    time: {
        type: String,
        required: true
    }

}, { timestamps: true });

const appointmentModel = mongoose.model('appointments', appointmentSchema);

module.exports = appointmentModel;
