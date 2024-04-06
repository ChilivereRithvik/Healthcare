// const docterModel = require('../models/docterModel');


// const getDocterInfoController = async (req, res) => {
//     try {
//         const docter = await decterModel.findOne({ userId: req.body.userId });
//         res.status(200).send({
//             success: true,
//             message: "Doctor data fetched successfully",
//             data: docter,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             success: false,
//             error: err, // Use err instead of error here
//             message: "Error in Fetching Doctor Details"
//         });
//     }
// };


// //update cdoc profile
// const updateProfileController = async (req, res) => {
//     try {
//         const docter = await docterModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
//         res.status(201).send({
//             success: trus,
//             message: "Docter Profile Updated Successfully",
//             data: docter
//         })

//     } catch (err) {
//         console.log(err);
//         res.status(500).send({
//             success: false,
//             error,
//             message: "Docter profile update issue"
//         })
//     }
// }


// module.exports = { getDocterInfoController, updateProfileController };







//new---------------------

const docterModel = require('../models/docterModel');

const getDocterInfoController = async (req, res) => {
    try {
        const docter = await docterModel.findOne({ userId: req.body.userId });
        res.status(200).send({
            success: true,
            message: "Doctor data fetched successfully",
            data: docter,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err,
            message: "Error in Fetching Doctor Details"
        });
    }
};

const updateProfileController = async (req, res) => {
    try {
        const docter = await docterModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(201).send({
            success: true, // Corrected to true
            message: "Doctor Profile Updated Successfully",
            data: docter
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err, // Use err instead of error here
            message: "Doctor profile update issue"
        });
    }
};

const getDocterByIdController = async (req, res) => {
    try {
        const doctor = await docterModel.findOne({ _id: req.body.docterId });
        res.status(200).send({
            success: true,
            message: "Docter Info featched",
            data: doctor,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Docter Information'
        })
    }

}





module.exports = { getDocterInfoController, updateProfileController, getDocterByIdController };
