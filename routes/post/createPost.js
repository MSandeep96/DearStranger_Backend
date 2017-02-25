var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/createPostResponse');

// ../post/createpost @POST

//user details have been validated

router.post('/',[isValidPost,savePost]);

function isValidPost(req,res,next){
    req.body['server_time'] = new Date();
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
    })
}

function savePost(req,res){
    req.body.save((err,post)=>{
        if(err) throw err;
        var resp = new Response();
        resp.postCreated(post.server_time);
        res.status(200).send(resp);
    })
}

module.exports=router;