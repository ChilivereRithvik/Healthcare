const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const deocterModel = require('../models/docterModel');
const docterModel = require('../models/docterModel');
const appointementModel = require('../models/appointementModel');
const moment = require('moment');


//Login Process----------------------------------------------------------------------------------------------------


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'User not found', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: "Invalid email or password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: '1h' });
        res.status(200).send({ message: "Login Success", success: true, token });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Error in login controller: ${error.message}`, success: false });
    }
};


//Registration process-----------------------------------------------------------------------------------

const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists', success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new userModel({
            name: req.body.name, // Add the user's name
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).send({ message: `Registration Success`, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Error in register controller: ${error.message}`, success: false });
    }
};

//-----------------------------------------------------------------------------------------
//Authontication process----
const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "user not found",
                success: false
            })

        } else {
            res.status(200).send({
                success: true,
                data: user
            })

        }

    } catch (e) {
        console.log(e);
        res.status(500).send({ message: "auth error", success: false, error: e });
    }
}
//-------------------------------------------------------------------------------------------------------


//Apply Docter-------------------

const applyDocterController = async (req, res) => {
    try {
        const newDocter = await docterModel({ ...req.body, status: 'pending' });
        await newDocter.save();
        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;
        notification.push({
            type: 'apply-docter-request',
            message: `${newDocter.firstName} Has Applied for a Docter Account`,
            data: {
                docterId: newDocter._id,
                name: newDocter.firstName,
                onClickPath: '/admin/docters'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });

        res.status(201).send({ success: true, message: 'Docter Account applied successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error While Applying Fro Docter", success: false,
            error
        })
    }
}


//-------notification CTRl
const getAllNotificationController = async (req, res) => {
    try {

        const user = await userModel.findOne({ _id: req.body.userId });
        const seennotification = user.seennotification;
        const notification = user.notification;

        seennotification.push(...notification);
        user.notification = [];
        user.seennotification = notification;
        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: 'all notification marked as read',
            data: updatedUser,
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in notification ',
            success: false,
            error
        })
    }
}

//Delete all Notification----------------------
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.notification = [];
        user.seennotification = [];
        const updateUser = await user.save();
        updateUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notification Deleted Successfully",
            data: updateUser
        });



    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'unabel to delete all notification',
            error
        })
    }
}


//--------getAllDoctersController--------------



const getAllDoctersController = async (req, res) => {

    try {
        const doctor = await docterModel.find({ status: 'approved' });
        res.status(200).send({
            success: true,
            message: "Doctord list Featched Successfully",
            data: doctor,
        })




    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While Featching Docter'

        })
    }

}











//---------------------------------------------


//Booking appointement controller---------

const bookappintementController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD:MM:YY').toString();
        req.body.time = moment(req.body.time, 'HH:MM').toString();

        req.body.status = 'pending';
        const newAppointement = new appointementModel(req.body);
        await newAppointement.save();
        const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });

        // Check if user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        user.notification.push({
            type: 'New-appointement-request',
            message: `A new Appointement Request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appintements'
        });
        await user.save();
        res.status(200).send({
            success: true,
            message: 'Appointment Booking is Successful'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while Booking Appointment"
        });
    }
};







module.exports = { loginController, registerController, authController, applyDocterController, getAllNotificationController, deleteAllNotificationController, getAllDoctersController, bookappintementController };
