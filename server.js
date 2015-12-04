var http = require('http');
var mongoose = require('mongoose');
var server = http.createServer(function (req,res){
	var greetingMsg = "Hello there!";
	console.log("INCOMING REQUEST: " + req.connection.remoteAddress + " " + req.method + " " + req.url);
});