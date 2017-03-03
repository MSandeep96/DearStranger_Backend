var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/createpost @POST

//user details have been validated

router.post('/',[cleanReq,isValidPost,savePost]);

function cleanReq(req,res,next){
    delete req.body['status'];
    delete req.body['match_to'];
    next();
}

function isValidPost(req,res,next){
    req.body['server_time'] = Number(new Date().getTime());
    var userPost = new Post(req.body);
    userPost.validate((err)=>{
        if(err){
            var resp = new Response();
            resp.errorOccured(err,"Invalid params");
            res.status(400).send(resp);
        }else{
            req.body=userPost;
            next();
        }
    });
}

function savePost(req,res){
    req.body.save((err,post)=>{
        if(err) throw err;
        var resp = new Response();
        resp.postCreated(post.server_time);
        res.status(200).send(resp);
    });
}

module.exports=router;