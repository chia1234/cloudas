var mongoose = require('mongoose');
db = mongoose.connect(uri);
//mongoose.connect('mongodb://localhost/myappdatabase');
 //mongodb://<dbuser>:<dbpassword>@ds061984.mongolab.com:61984/ouhk

var http = require('http');
var url  = require('url');

var server = http.createServer(function (req,res){
	var greetingMsg = "Hello there!";
	console.log("INCOMING REQUEST: " + req.connection.remoteAddress + " " + req.method + " " + req.url);
});