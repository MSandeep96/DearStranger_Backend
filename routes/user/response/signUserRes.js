var randTokenGen = require('rand-token');

//base response
function Response(){
    this.success=false;
    this.response="Base Response";
};

Response.prototype.userLoggedIn=function(userDoc){
    this.success = true;
    this.response = "Success";
    this.new_user = false;
    this.access_token = randTokenGen.generate(12);
    this.user_id = userDoc['_id'];
}

Response.prototype.userCreated=function(userDoc){
    this.success = true;
    this.response = "Success";
    this.new_user = true;
    this.access_token = randTokenGen.generate(12);
    this.user_id = userDoc['_id'];
}

Response.prototype.errorOccured = function(error,errorMsg){
    this.response = errorMsg;
    this.error = error;
}

module.exports = Response;
