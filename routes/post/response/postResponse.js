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

Response.prototype.gotContent = function (post) {
    this.success = true;
    this.response = "Success";
    this.content = post.content;
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

Response.prototype.postCreated = function(server_time,post_id){
    this.success = true;
    this.response = "Success";
    this.created_on = server_time;
    this.post_id = post_id;
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
