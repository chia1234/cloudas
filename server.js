var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var RestSchema = require('./models/restaurant');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
// var ObjectId = require('mongodb').ObjectID;
//mongoose.connect('mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk');
//var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
var mongoose = require('mongoose');
app.get('/restaurant_id/:x', function(req,res){
	var RestSchema = require('./models/restaurant');
	var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
	var mongoose = require('mongoose');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	var json = '{}';
	
	//res.write(".:"+mongoose.connection.readyState);
	//console.log('Incoming request: GET');
	//res.write('Request body: ', req.body+'\n');
	//res.write('name: ', req.params.name+'\n');

	//db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function (callback) {
	var rest = mongoose.model('restaurant', RestSchema);
	//Kitten.find({name: new RegExp(req.params.x)},function(err,results){
	rest.find({street: req.params.x},function(err,results){
			if (err) {
				//res.write("Error: " + err.message);
				//res.json("Error: " + err.message);
				db.close();
				res.write("Error Message:"+err.message);
				//res.write("write");
				res.end("Not Found json:"+json+"\n",200);
			}
			else {
				db.close();
				//res.write('Found: ',results.length);
				
				//res.json(results);
				res.end("Find Json::"+json+"\n",200);

			}
		});
	});
	
});

app.post('/', function(req,res){
	var RestSchema = require('./models/restaurant');
	var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
	var mongoose = require('mongoose');
	mongoose.connect(mongodbURL);
	var db = mongoose.connection;
	res.write(".:"+mongoose.connection.readyState);

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
		var rest = mongoose.model('restaurant', RestSchema);
		var r = new rest(req.body);
		r.save(function(err,results){
			if (err) {
				res.end("error"+err.message,500);
			}
			else {
				db.close();
				res.end('Done',200);
			}
		});
	});
	db.close();
});

app.listen(process.env.PORT || 8099);