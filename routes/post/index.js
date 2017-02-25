var express = require('express');
var router = express.Router();

var User = require('../../database/Users/UserSchema');

var createpost = require('./createPost');

var baseResponse = {
    success : false,
    response : "Invalid access token"
};

router.use(function(req,res,next){
    if(!req.body.user_id){
        res.status(403).send(baseResponse);
    }
    User.findById(req.body.user_id,function(err,user){
        if(err || !user){
            res.status(400).send(baseResponse);
        }else if(req.body.access_token !== user.access_token){
            res.status(403).send(baseResponse);
        }else{
            next();
        }
    })
});


router.use('/createpost',createpost);

module.exports = router;