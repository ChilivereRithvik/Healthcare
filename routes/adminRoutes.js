const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUserController, getAllDocterController, changeAccountStatus } = require('../controller/adminCtrl');


const router = express.Router();
//get method User

router.get('/getAllUsers', authMiddleware, getAllUserController)


//get method Docters
router.get('/getAllDocters', authMiddleware, getAllDocterController);

//POST ACCOUNT STATUS ROUTER.post
router.post('/changeAccountStatus', authMiddleware, changeAccountStatus);


module.exports = router;