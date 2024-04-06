const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const path = require('path');

require('dotenv').config();

//mongodb connection
connectDb();

const app = express();
const port = process.env.PORT || 8000;



//middleware
app.use(express.json());
app.use(morgan('dev'));


//routes

app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/docter', require('./routes/DocterRoutes'));

//static file
app.use(express.static(path.join(__dirname, './clint/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './clint/build/index.html'));
});



// app.get("/", (req, res) => {
//     res.status(200).send({ message: "server running" });
// });


//listen to port
app.listen(port, () => {
    console.log(`server is running ${port}`);
});