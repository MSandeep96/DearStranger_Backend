var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
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
        required : true
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
    match_to : String
});

module.exports = mongoose.model('Post',postSchema);