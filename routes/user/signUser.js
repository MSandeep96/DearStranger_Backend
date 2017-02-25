var express = require('express');
var router = express.Router();
var User = require('../../database/Users/UserSchema');
var Response = require('./response/signUserRes.js');
var randTokenGen = require('rand-token');

// @Route ../user/signuser @POST 



router.post('/',[validateBody ,doesExist,createUser]);

//check if data is valid
function validateBody(req,res,next){
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
            var resp = new Response();
            resp.errorOccured(err,"Something went wrong");
            res.status(400).send(resp);
        }else if(!doc){
            //no user
            next();
        }else{
            //user present
            storeUser(doc,res);
        }
    });
}


function storeUser(doc,res){
    doc.access_token = randTokenGen.generate(12);
    doc.save((err,newDoc)=>{
        if(err){
            //error
            var resp = new Response();
            resp.errorOccured(err,"Something went wrong");
            res.status(400).send(resp);
        }else{
            var resp = new Response();
            resp.userLoggedIn(newDoc);
            res.status(200).send(resp);
        }
    });
}

//if user doesn't exist, create the user
function createUser(req,res){
    req.body.access_token = randTokenGen.generate(12);
    req.body.save((err,user)=>{
        if(err) throw err;
        var resp = new Response();
        resp.userCreated(user);
        res.status(200).send(resp);
    });
}


module.exports = router;