var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../Post/markread @POST

/*
    Body expected
    user_id: Readers's id,
    post_id: post's id
*/

router.post('/',markRead);

function markRead(req,res){
    Post.findById(req.body.post_id,(err,post)=>{
        if(err || !post){
            var resp = new Response();
            resp.errorOccured(err,"Invalid post_id");
            res.status(400).send(resp);
            return;
        }
        if(post.match_to!=req.body.user_id){
            var resp = new Response();
            resp.errorOccured(err,"Unauthorized Request");
            res.status(401).send(resp);
            return;
        }
        post.update({
            status: 'read'
        },(err,raw)=>{
            if(err) throw err;
            res.sendStatus(200);
        });
    });
}

module.exports=router;