var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var RestSchema = require('./models/restaurant');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
//mongoose.connect('mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk');
var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
var mongoose = require('mongoose');
app.get('/restaurant_id/:x', function(req,res){
	log('Incoming request: GET');

	// console.log('Incoming request: GET');
	// console.log('Request body: ', req.body);
	// console.log('name: ', req.params.name);
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function (callback) {
		var rest = mongoose.model('restaurant', RestSchema);
		//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
		rest.find({restaurant_id: req.params.x},function(err,results){
			if (err) {
				console.log("Error: " + err.message);
				res.write(err.message);
			}
			else {
				db.close();
				console.log('Found: ',results.length);
				res.json(results);
			}
		});
	});
	res.end('Connection closed ededed',200);
});

// // Path 4
// app.delete('/name/:name', function(req,res) {
// 	console.log('Incoming request: DELETE');
// 	console.log('Request body: ', req.body);
// 	console.log('name: ', req.params.name);
// 	res.end('Connection closed',200);
// });

// // Path 5
// app.post('/',function(req,res) {
// 	console.log('Incoming request: POST');
// 	console.log('Request body: ', req.body);
// 	console.log('name: ', req.body.name);
// 	console.log('age: ', req.body.age);
// 	res.end('Connection closed',200);
// });

// // Path 6
// app.put('/',function(req,res) {
// 	console.log('Incoming request: PUT');
// 	console.log('Request body: ', req.body);
// 	console.log('name: ', req.body.name);
// 	console.log('age: ', req.body.age);
// 	res.end('Connection closed',200);
// });

app.listen(process.env.PORT || 8099);