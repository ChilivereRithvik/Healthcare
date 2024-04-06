const mongoose = require('mongoose');
require('dotenv').config();
const mongourl = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(mongourl);
        console.log("mongoDB connected");
    } catch (e) {
        console.log(`failed to connect mongodb ${e}`)
    }

};

module.exports = connectDb;