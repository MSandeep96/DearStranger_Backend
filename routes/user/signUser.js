var express = require('express');
var router = express.Router();
var User = require('../../database/Users/UserSchema');
var Response = require('./response/signUserRes.js');

// @Route ../user/signuser @POST 


router.post('/',[validate,doesExist,createUser]);

//check if data is valid
function validate(req,res,next){
    var userObj = new User(req.body);
    userObj.validate((err)=>{
        if(err){
            //invalid data
            var resp = new Response();
            resp.errorOccured(err,"Invalid params");
            res.status(400).send(resp);
        }else{
            //valid data
            req.body = userObj;
            next();
        }
    });
}

//check if user exists
function doesExist(req,res,next){
    User.findOne({'email':req.body.email},(err,doc)=>{
        if(err){
            //error
            res.status(400).send(err);
        }else if(!doc){
            //no user
            next();
        }else{
            //user present
            var resp = new Response();
            resp.userLoggedIn(doc);
            res.status(200).send(resp);
        }
    });
}

//if user doesn't exist, create the user
function createUser(req,res){
    var user;
    req.body.save((err,user)=>{
        var resp = new Response();
        resp.userCreated(user);
        res.status(200).send(resp);
    });
}


module.exports = router;