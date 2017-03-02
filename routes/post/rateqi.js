var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/rateqi  @Post

/*
    Body expected: 
    user_id: Replier's ID,
    post_id: Post's ID,
    qi_rate : Number
*/

router.post('/',[getPost,updatePost]);

var alreadyRated = false;
var previousRating = 0;

function getPost(req,res){
    Post.findById(req.body['post_id'],function(err,post){
        if(err || !post){
            var resp = new Response();
            resp.errorOccured(err,"Invalid postID");
            res.status(400).send(resp);
            return;
        }
        if(post.match_to != req.body.user_id || (post.ai_rate>5|| post.ai_rate<0)){
            var resp = new Response();
            resp.errorOccured("Unauthorized","Invalid request");
            resp.status(401).send(resp);
            return;
        }
        if(post.qi_given!==0){
            alreadyRated = true;
            previousRating = post.qi_given;
        }
        updatePost(req,post);
        updateUserRating(post);
        res.sendStatus(200);
    });
}

function updatePost(req,post){
    // TODO: Send push notification
    post.update({qi_given: req.body.qi_rate},(err)=>{
        if (err)
            throw err;
    });
}

function updateUserRating(post){
    User.findById(post.user_id,(err,user)=>{
        if(err)
            throw err;
        if(alreadyRated){
            var presentRating = (user.qi* user.qi_voters + post.qi_rate - previousRating)/user.qi_voters;
            user.update({qi: presentRating},(err)=>{
                if(err)
                    throw err;
            });
        }else{
            var presentRating = (user.qi * user.qi_voters + post.qi_rate)/(user.qi_voters+1);
            user.update({qi: presentRating,$inc: {qi_voters : 1}},(err)=>{
                if(err) throw err;

            });
        }
    });
}

module.exports = router;