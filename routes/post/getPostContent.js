var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/getcontent?user_id=x&access_token=y&post_id=z @GET

router.get('/', getpost);

function getpost(req, res) {
    if (!req.query.post_id) {
        var resp = new Response();
        resp.errorOccured(null, "Invalid params");
        res.status(400).send(resp);
        return;
    }
    var callBack = function (err, content) {
        if (err) throw err;
        var resp = new Response();
        resp.gotContent(content);
        res.status(200).send(resp);
    };

    Post.findById(req.query.post_id).select('content').exec(callBack);
}


module.exports = router;