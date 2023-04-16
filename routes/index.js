const express = require('express');
const router = express.Router();

const taskController = require('../controller/taskController');

router.get('/', taskController.home);

router.use('/users', require('./user'));

module.exports = router;