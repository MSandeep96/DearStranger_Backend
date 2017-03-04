var express = require('express');
var router = express.Router();

var singUser = require('./signUser');
var fcmtoken =  require('./fcmToken');

router.use('/signuser',singUser);
router.use('/fcmtoken',fcmtoken);

module.exports = router;