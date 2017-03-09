var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/editpost @POST

//user details have been validated

/**
 * Body expected
 *  post_id:
 *  content:
 *  title:
 */

router.post('/', [cleanReq, findAndUpdatePost]);

function cleanReq(req, res, next) {
    delete req.body['status'];
    delete req.body['match_to'];
    next();
}

function findAndUpdatePost(req,res,next) {
    Post.findById(req.body.post_id,(err,orgpost)=>{
        if(err) throw err;
        if(!orgpost){
            var resp = new Response();
            resp.errorOccured("No post","Bad request");
            res.status(400).send(resp);
        }else{
            if(orgpost.status === 'write' || orgpost.status === 'match'){
                orgpost.update({'content':req.body.content, 'title':req.body.title},(err,raw)=>{
                    if(err) throw err;
                    res.sendStatus(200);
                })
            }else{
                var resp = new Response();
                resp.errorOccured("Invalid request","Post already read");
                resp.sendStatus(400);
            }
        }
    });
}

module.exports = router;