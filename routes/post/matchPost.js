var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/matchpost @POST 

router.post('/', matchpost);

function matchpost(req, res) {
    // TODO: Add user_id!= requester's user id 
    Post
        .findOneAndUpdate({ status: 'write', user_id : { $ne : req.body.user_id } },
        { $set: { status: 'match', match_to: req.body.user_id } },
        { new: true},
        (err, doc) => {
            if (err) throw err;
            if (!doc) {
                var resp = new Response();
                resp.noPostsAvailable();
                res.status(200).send(resp);
            } else {
                var resp = new Response();
                resp.matchpost(doc);
                res.status(200).send(resp);
            }
        });
}

module.exports = router;