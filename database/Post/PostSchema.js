var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title : {
        type : String,
        required: true
    },
    content : {
        type : String,
        required : true
    },
    user_id : {
        type: String,
        required : true
    },
    client_time : {
        type : Number,
    },
    server_time : {
        type : String,
        required : true
    },
    date_rep : {
        type : Number,
        required : true
    },
    status : {
        type: String,
        enum : ['write','match','read','reply'],
        default : 'write'
    },
    reply: String,
    qi_given : {
        type: Number,
        default:0
    },
    ai_given : {
        type: Number,
        default:0
    },
    match_to : String
});

module.exports = mongoose.model('Post',postSchema);