const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "name is require"]
    },
    email: {
        type: String,
        require: [true, "email required"]
    },
    password: {
        type: String,
        require: [true, "password required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDocter: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        default: [],
    },
    seennotification: {
        type: Array,
        default: [],
    },

});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;