var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');


///require routes folders
var routes = require('./routes');


var app = express();


//start db
require('./database/db');


// utilities used
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req,res) => {
	res.status(200).send("Welcome to DearStranger");
});

//all handling folders here
app.use('/',routes);


//Unhandled urls get routed here

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

var endpoint_invalid = {
    success : false,
    response : "Invalid endpoint"
};

// error handler
app.use(function (err, req, res, next) {
	endpoint_invalid.response = err.message;
	res.status(err.status || 400).send(endpoint_invalid);
});

module.exports = app;
