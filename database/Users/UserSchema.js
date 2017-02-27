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
    social_id: {
        type: String,
        required: true
    },
    google_id : String,
    facebook_id : String,
    prof_pic: String,
    fcm_token: String,
    qi : {
        type: Number,
        default : 0
    },
    ai : {
        type: Number,
        default : 0
    }
});

module.exports = mongoose.model('User',userSchema);