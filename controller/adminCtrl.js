const docterModel = require('../models/docterModel');
const userModel = require('../models/userModels');

const getAllUserController = async (req, res) => {
    try {
        const users = await userModel.find({}); // Changed variable name from "res" to "users"
        res.status(200).send({
            success: true,
            message: "User data list",
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching users",
            error,
        });
    }
};

const getAllDocterController = async (req, res) => {
    try {
        const docters = await docterModel.find({}); // Changed variable name from "res" to "docters"
        res.status(200).send({
            success: true,
            message: "Doctor data list",
            data: docters,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while fetching doctors data",
            error,
        });
    }
};




//--------------------------------------------------


const changeAccountStatus = async (req, res) => {
    try {
        const { docterId, status } = req.body;
        const docter = await docterModel.findByIdAndUpdate(docterId, { status });

        if (!docter) {
            return res.status(404).send({
                success: false,
                message: 'Doctor not found with the given ID'
            });
        }



        if (!docter.userId) {
            return res.status(400).send({
                success: false,
                message: 'Doctor document does not contain userId field'
            });
        }

        const user = await userModel.findById(docter.userId);
        const notification = user.notification;
        notification.push({
            type: 'doctor-account-request-updated',
            message: `Your Doctor Account Request Has ${status}`,
            onClickPath: '/notification'
        });

        user.notification = notification;

        console.log(user.isDocter);
        user.isDocter = status === 'approved' ? true : false;
        await user.save();
        console.log(user.isDocter);

        res.status(201).send({
            success: true,
            message: 'Account Status Updated',
            data: docter,

        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Account Status Update'
        });
    }
};




module.exports = { getAllUserController, getAllDocterController, changeAccountStatus };
