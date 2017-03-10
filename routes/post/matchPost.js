var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/matchpost @POST 

router.post('/',[checkIfMatched, matchpost]);

function checkIfMatched(req,res,next){
    var dateRep = getDateRep()+1;
    var weekTimeDayRep = dateRep-8;
    Post.findOne({status: {$in:['match','read']}, 
        match_to: req.body.user_id,
        date_rep:{$gte :weekTimeDayRep , $lte : dateRep}
                })
        .exec((err,doc)=>{
            if(err) throw err;
            if(doc){
                var resp = new Response();
                resp.matchedpost(doc);
                res.status(200).send(resp);
            }else{
                next();
            }
        })
}

function matchpost(req, res) {
    // TODO: Sort against dateRep
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

function getDateRep(){
    var serverDate = new Date();
    var dateRep = serverDate.getDate+(serverDate.getMonth+1)*100+serverDate.getFullYear*10000;
    return dateRep;
}

module.exports = router;