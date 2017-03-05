var express = require('express');
var router = express.Router();

var Post = require('../../database/Post/PostSchema');
var Response = require('./response/postResponse');

// ../post/fetchpost?user_id=x&access_token=y&millis=xyzxyz @GET

router.get('/',getposts);

function getposts(req,res){
    var presDate = new Date(Number(req.query.millis));
    var presDateRep = getDateRep(presDate);
    var pastDateRep = getWeekAgoDateRep(presDate);
    console.log(presDate+"\n"+presDateRep+" "+pastDateRep);
    Post
    .find({ 
        user_id : req.query.user_id,
        date_rep : {$lte:presDateRep, $gt: pastDateRep }
    })
    .select('client_time date_rep status')
    .exec((err,posts)=>{
        if(err) throw err;
        var resp = new Response();
        resp.fetchedPosts(posts);
        res.status(200).send(resp);
    });
}

function getDateRep(date){
    return date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
}

function getWeekAgoDateRep(date){
    date.setDate(date.getDate()-7);
    return date.getFullYear()*10000+(date.getMonth()+1)*100+date.getDate();
}

module.exports = router;
