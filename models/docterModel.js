const mongoose = require('mongoose');

const docterSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    specialization: {
        type: String,
        required: [true, 'Specialization is required']
    },
    experience: {
        type: String,
        required: [true, 'Experience is required']
    },
    feesPreConsultation: {
        type: [Number], // Change type to an array of numbers
        required: [true, 'Fee is required']
    },
    status: {
        type: String,
        default: 'pending'
    },
    timings: {
        type: Object,
        required: [true, 'Work timing is required']
    }
}, { timestamps: true });

const docterModel = mongoose.model('docters', docterSchema);
module.exports = docterModel;
