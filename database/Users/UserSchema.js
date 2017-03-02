var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    login_type: {
        type: String,
        enum: ['google','facebook','both'],
        required: true
    },
    google_id : String,
    facebook_id : String,
    access_token : String,
    prof_pic: String,
    fcm_token: String,
    //Life force, gets from posts
    qi : {
        type: Number,
        default : 0
    },
    qi_voters: {
        type: Number,
        default: 0
    },
    //Love, gets from replies
    ai : {
        type: Number,
        default : 0
    },
    ai_voters:{
        type: Number,
        default:0
    }
});

module.exports = mongoose.model('User',userSchema);