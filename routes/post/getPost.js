var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/getpost?user_id=x&access_token=y&post_id=z @GET 
// or
// ../post/getpost?user_id=x&access_token=y&date_rep=z @GET

router.get('/', getpost);

function getpost(req, res) {
    if (!req.query.post_id && !req.query.date_rep) {
        var resp = new Response();
        resp.errorOccured(null, "Invalid params");
        res.status(400).send(resp);
        return;
    }
    var callBack = function (err, post) {
        if (err) throw err;
        var resp = new Response();
        resp.gotPost(post);
        res.status(200).send(resp);
    };

    if (req.query.post_id) {
        Post.findById(req.query.post_id).exec(callBack);
    } else {
        Post.findOne({
            user_id: req.query.user_id,
            date_rep: req.query.date_rep
        }).exec(callBack);
    }
}


module.exports=router;