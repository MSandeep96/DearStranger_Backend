var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

/*
    Body expected: 
    user_id: Post OP's ID,
    post_id: Post's ID,
    ai_rate : Number
*/

router.post('/',[getPost,updatePost]);

var alreadyRated = false;
var previousRating = 0;

function getPost(req,res){
    Post.findById(req.body['post_id'],function(err,post){
        if(err || !post){
            var resp = new Response();
            resp.errrorOccured(err,"Invalid postID");
            res.status(400).send(resp);
            return;
        }
        if(post.user_id != req.body.user_id || (post.ai_rate>5|| post.ai_rate<0)){
            var resp = new Response();
            resp.errorOccured("Unauthorized","Invalid request");
            resp.status(401).send(resp);
            return;
        }
        if(post.ai_given!==0){
            alreadyRated = true;
            previousRating = post.ai_given;
        }
        updatePost(req,post);
        updateUserRating(post);
        res.sendStatus(200);
    });
}

function updatePost(req,post){
    // TODO: Send push notification
    post.update({ai_given: req.body.ai_rate},(err)=>{
        if (err)
            throw err;
    });
}

function updateUserRating(post){
    User.findById(post.match_to,(err,user)=>{
        if(err)
            throw err;
        if(alreadyRated){
            var presentRating = (user.ai* user.ai_voters + post.ai_rate - previousRating)/user.ai_voters;
            user.update({ai: presentRating},(err)=>{
                if(err)
                    throw err;
            });
        }else{
            var presentRating = (user.ai * user.ai_voters + post.ai_rate)/(user.ai_voters+1);
            user.update({ai: presentRating,$inc: {ai_voters : 1}},(err)=>{
                if(err) throw err;
                
            });
        }
    });
}

module.exports = router;