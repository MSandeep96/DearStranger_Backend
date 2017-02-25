//base response
function Response(){
    this.success=false;
    this.response="Base Response";
};

Response.prototype.postCreated = function(server_time){
    this.response = "Success";
    var serverDate = new Date(server_time);
    this.created_on = serverDate.getTime();
    this.posted = true;
}

Response.prototype.errorOccured = function(error,errorMsg){
    this.response = errorMsg;
    this.error = error;
}

module.exports = Response;
