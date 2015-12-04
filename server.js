var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

	// var parsedURL = url.parse(req.url,true); //true to get query as object
 //    var queryAsObject = parsedURL.query;
 //    if (parsedURL.pathname == '/') {
 //        console.log(queryAsObject);
 //    }
	//res.write('Hello World\n');
	if(req.method == "GET"){
		console.log("get");
		//res.write('Get method\n');
	}
	if(req.method == "POST"){
		console.log("post");
		//res.write("POST method\n");
	}
	res.end("End\n");
}).listen(port);

// function R(building,lon,lat,street,zipcode,borough,cuisine,name,restaurant_id) {
//     function Address(building,lon,lat,street,zipcode) {
//         this.building = building;
//         this.coord = [];
//         this.coord.push(lon);
//         this.coord.push(lat);
//         this.street = street;
//         this.zipcode = zipcode;
//     }
//     this.address = new Address(building,lon,lat,street,zipcode);
//     this.borough = borough;
//     this.cuisine = cuisine;
//     this.grades = [];
//     this.name = name;
//     this.restaurant_id = restaurant_id;
// }