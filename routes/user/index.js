var express = require('express');
var router = express.Router();

var singUser = require('./signUser.js');

router.use('/signuser',singUser);


module.exports = router;