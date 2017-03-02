//base response
function Response(){
    this.success=false;
    this.response="Base Response";
};

Response.prototype.noPostsAvailable = function(){
    this.response = "Not matched";
}

Response.prototype.gotPost = function(post){
    this.success = true;
    this.response = "Success";
    this.post = post;
}

Response.prototype.matchpost = function(post){
    this.success = true;
    this.response = "Success";
    this.post = post;
}

Response.prototype.matchedpost = function(post){
    this.success = true;
    this.response = "Matched Already";
    this.post = post;
}

Response.prototype.postCreated = function(server_time){
    this.success = true;
    this.response = "Success";
    var serverDate = new Date(server_time);
    this.created_on = serverDate.getTime();
    this.posted = true;
}

Response.prototype.fetchedPosts = function(posts){
    this.success = true;
    this.response = "Success";
    this.posts = posts;
}

Response.prototype.errorOccured = function(error,errorMsg){
    this.response = errorMsg;
    this.error = error;
}

module.exports = Response;
