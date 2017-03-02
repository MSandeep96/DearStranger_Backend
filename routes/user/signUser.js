var express = require('express');
var router = express.Router();
var User = require('../../database/Users/UserSchema');
var Response = require('./response/signUserRes.js');
var randTokenGen = require('rand-token');

// @Route ../user/signuser @POST 



router.post('/', [validateBody, doesExist, createUser]);

//check if data is valid
function validateBody(req, res, next) {
    // TODO: Dont let user send qi or ai

    if ((req.body['login_type'] === 'google' && !req.body.google_id)
        || (req.body['login_type'] === 'facebook' && !req.body.facebook_id)
        || req.body['login_type']==='both') {
        var resp = new Respone();
        resp.errorOccured("Send proper login type and id","Invalid params");
        res.status(400).send(resp);
    }
    if(req.body.qi || req.body.ai){
        var resp = new Response();
        resp.errorOccured("Do not try to set ai or qi", "Extra Params");
        res.status(403).send(resp);
    }
    if(req.body['login_type']=== 'google'){
        delete req.body['facebook_id'];
    }else{
        delete req.body['google_id'];
    }
    var userObj = new User(req.body);
    userObj.validate((err) => {
        if (err) {
            //invalid data
            var resp = new Response();
            resp.errorOccured(err, "Invalid params");
            res.status(400).send(resp);
        } else {
            //valid data
            req.body = userObj;
            next();
        }
    });
}

//check if user exists
function doesExist(req, res, next) {
    User.findOne({ 'email': req.body.email }, (err, doc) => {
        if (err) {
            //error
            var resp = new Response();
            resp.errorOccured(err, "Something went wrong");
            res.status(400).send(resp);
        } else if (!doc) {
            //no user
            next();
        } else {
            //user present
            storeUser(doc, req,res);
        }
    });
}


function storeUser(doc, req, res) {
    if(doc.login_type != 'both' && doc.login_type != req.body['login_type'] ){
        doc.login_type = 'both';
        if(req.body.login_type==='google'){
            doc.google_id=req.body.google_id;
        }else{
            doc.facebook_id = req.body.facebook_id;
        }
    }
    // TODO: 
    // doc.access_token = randTokenGen.generate(12);
    doc.access_token = "666";
    doc.save((err, newDoc) => {
        if (err) {
            //error
            var resp = new Response();
            resp.errorOccured(err, "Something went wrong");
            res.status(400).send(resp);
        } else {
            var resp = new Response();
            resp.userLoggedIn(newDoc);
            res.status(200).send(resp);
        }
    });
}

//if user doesn't exist, create the user
function createUser(req, res) {
    // TODO:
    // req.body.access_token = randTokenGen.generate(12);
    req.body.access_token = "666";
    req.body.save((err, user) => {
        if (err) throw err;
        var resp = new Response();
        resp.userCreated(user);
        res.status(200).send(resp);
    });
}


module.exports = router;