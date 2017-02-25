var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/fetchpost?user_id=x&access_token=y&pres=z @GET

router.get('/',getposts);

function getposts(req,res){
    Post
    .find({ user_id : req.query.user_id})
    .limit(7)
    .select('client_time date_rep status')
    .exec((err,posts)=>{
        if(err) throw err;
        var resp = new Response();
        resp.fetchedPosts(posts);
        res.status(200).send(resp);
    });
}

module.exports = router;
