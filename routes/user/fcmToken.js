var express = require('express');
var router = express.Router();
var User = require('../../database/Users/UserSchema');
var Response = require('./response/userResponse');

// ../user/fcmtoken @POST 

/*
    Body expected 

    user_id,
    access_token,
    fcm_token
*/


router.post('/',[addFcmToken]);

function  addFcmToken(req,res) {
    User.findById(req.body.user_id,(err,user)=>{
        if(err) throw err;
        if(!user || user.access_token != req.body.access_token){
            var resp = new Response();
            resp.errorOccured("Check params again","Invalid params");
            res.status(400).send(resp);
            return;
        }
        user.update({'fcm_token' : req.body.fcm_token },(err,rawStr)=>{
            if(err) throw err;
            res.sendStatus(200);
        });
    })
}

module.exports = router;