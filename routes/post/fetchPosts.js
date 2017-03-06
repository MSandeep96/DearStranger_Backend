var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/fetchpost?user_id=x&access_token=y&date_rep=yyyymmdd @GET

router.get('/',getposts);

function getposts(req,res){
    var presDateRep = Number(req.query.date_rep);
    var pastDateRep = getWeekAgoDateRep(presDateRep);
    Post
    .find({ 
        user_id : req.query.user_id,
        date_rep : {$lte:presDateRep, $gt: pastDateRep }
    })
    .sort({"date_rep":-1})
    .select('server_time date_rep status')
    .exec((err,posts)=>{
        if(err) throw err;
        var resp = new Response();
        resp.fetchedPosts(posts);
        res.status(200).send(resp);
    });
}

function getWeekAgoDateRep(presDate){
    var date = new Date();
    date.setFullYear((presDate / 10000));
    date.setMonth((presDate / 100) % 100 -1);
    date.setDate(presDate%100);
    date.setDate(date.getDate()-7);
    return date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
}

module.exports = router;
