var express = require('express');
var router = express.Router();
var users = require('./user');
var post = require('./post');

// TODO: Load the secret from process.env
const AUTH_DEVICE_TOKEN = "LALALALA";

var auth_failed_response = {
    success : false,
    response : "Authorization failed"
};

// TODO: Make more secure 
router.use(function(req,res,next){
    if(req.method==='GET'){ 
        next();
        return;
    }
    if(req.body['AUTH_DEVICE_TOKEN']===AUTH_DEVICE_TOKEN){
        delete req.body['AUTH_DEVICE_TOKEN'];
        next();
    }else{
        res.status(403).send(auth_failed_response);
    }
});

router.use('/user',users);
router.use('/post',post);

module.exports = router;
