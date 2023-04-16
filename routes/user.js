const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');

router.get('/signup', userController.signup);
router.get('/signin', userController.signin);
router.post('/addUser', userController.addUser);



module.exports = router;