const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { getDocterInfoController, updateProfileController, getDocterByIdController } = require('../controller/docterCtrl');

//Post doceter info
router.post('/getDocterInfo', authMiddleware, getDocterInfoController);

//post update profile
router.post('/updateProfile', authMiddleware, updateProfileController)


//Post get docter info
router.post('/getDocterById', authMiddleware, getDocterByIdController);

module.exports = router;