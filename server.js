var http = require('http');
var url  = require('url');
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
//mongoose.connect('mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk');
var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
var mongoose = require('mongoose');
mongoose.connect(mongodbURL);
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	console.log("Hello World");
	//res.write('Hello World\n');
	if(req.method == "GET"){
		console.log("get");
		res.write('Get method\n');
	}
	if(req.method == "POST"){
		console.log("post");
		res.write("POST method\n");
	}
	res.end("End\n");
}).listen(port);