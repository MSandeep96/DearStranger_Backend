var express = require('express');
var router = express.Router();

var User = require('../../database/Users/UserSchema');

var createpost = require('./createPost');
var fetchpost = require('./fetchPosts');
var getpost = require('./getPost');
var matchpost = require('./matchPost');

var baseResponse = {
    success : false,
    response : "Invalid access token"
};

router.use(function(req,res,next){
    var id,access_token;
    if(req.method==='GET'){
        id = req.query.user_id;
        access_token = req.query.access_token;
    }else{
        id = req.body.user_id;
        access_token = req.body.access_token;
    }
    if(!id){
        res.status(403).send(baseResponse);
        return;
    }
    User.findById(id,function(err,user){
        if(err || !user){
            res.status(400).send(baseResponse);
        }else if(access_token !== user.access_token){
            res.status(403).send(baseResponse);
        }else{
            next();
        }
    });
});


router.use('/createpost',createpost);
router.use('/fetchpost',fetchpost);
router.use('/getpost',getpost);
router.use('/matchpost',matchpost);

module.exports = router;