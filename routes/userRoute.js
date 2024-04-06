const express = require('express');
const {
    loginController,
    registerController,
    authController,
    applyDocterController,
    getAllNotificationController,
    deleteAllNotificationController,
    getAllDoctersController,
    bookappintementController
} = require('../controller/userCtrl');


const authMiddleware = require('../middlewares/authMiddleware');

//router object

const router = express.Router();
//Routes

router.post('/login', loginController);
//regisster
router.post('/register', registerController);


//Auth || post
router.post('/getUserdata', authMiddleware, authController);

//Apply Docter
router.post('/apply-docter', authMiddleware, applyDocterController);


//Notification Docter || POST
router.post('/get-all-notification', authMiddleware, getAllNotificationController);

//Notification Docter || POST
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController);


//Get all doctor
router.get('/getAllDocter', authMiddleware, getAllDoctersController)


//Book appintement 
router.post('/book-appintement', authMiddleware, bookappintementController);

module.exports = router;