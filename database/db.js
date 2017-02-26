var mongoose = require('mongoose');
mongoose.connect('mongodb://sande96:queenrocks96@ds145389.mlab.com:45389/dear_stranger');
//mongoose.connect('mongodb://localhost/dear_diary');

var db = mongoose.connection;
db.on('error',()=>{
    console.error.bind(console, 'connection error:');
    // TODO: remove this
    process.exit();
});