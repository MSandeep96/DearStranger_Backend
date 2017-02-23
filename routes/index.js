var express = require('express');
var router = express.Router();
var users = require('./user');

router.use('/user',users);

module.exports = router;
