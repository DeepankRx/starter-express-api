const UserControllers = require('../controllers/user');
const { verifyToken } = require('../middlewares/jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/user/signup', UserControllers.signup);
router.post('/user/login', UserControllers.login);
router.get('/user/userProfile/:id', verifyToken, UserControllers.getProfile);
router.post('/address/addAddress/:id', verifyToken, UserControllers.addAddress);
module.exports = router;
