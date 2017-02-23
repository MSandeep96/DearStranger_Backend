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
        enum: ['google','facebook'],
        required: true
    },
    social_id: {
        type: String,
        required: true
    },
    access_token: String,
    prof_pic: String,
    fcm_token: String
});

module.exports = mongoose.model('User',userSchema);