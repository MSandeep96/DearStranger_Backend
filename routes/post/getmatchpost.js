var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/getmatchpost?user_id=x&access_token=y @GET

router.get('/', getmatchpost);

function getmatchpost(req, res) {
    Post
        .findOne({
            match_to: req.query.user_id,
            status : {$in: ['match','read']}
        })
        .exec((err, post) => {
            if (err) throw err;
            if (!post) {
                var resp = new Response();
                resp.noPostsAvailable();
                res.status(200).send(resp);
            } else {
                var resp = new Response();
                resp.gotPost(post);
                res.status(200).send(resp);
            }
        });
}

module.exports = router;