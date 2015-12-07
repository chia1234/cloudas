var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
console.log("hello");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
                //replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 3000 } },
                 //};

var options = { server: { socketOptions: { keepAlive: 1} }};
var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';

//var mongodbUri = 'mongodb://localhost/restaurant';

// mongoose.connect(mongodbUri);
// //mongoose.createConnection(mongodbUri);
// console.log("connected");

//var conn = mongoose.connection;
console.log("set all var clear");
console.log(mongoose.connection.readyState);

app.get('/restaurant_id/:x', function(req,res){
	var RestSchema = require('./models/restaurant');
	var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
	var db = mongoose.connection;
	//console.log("start handle app.get");
	db.on('error', console.error);
	//console.log("no error conn");
	db.once('open', function(){
		var rest = mongoose.model('restaurant', RestSchema);
		rest.find({restaurant_id: req.params.x},function(err,results){
			if (err) {
				//console.log("Error");
				res.json({message:'No matching document', restaurant_id : req.params.x});
				res.end();
			}
			else {
				if(results.length == 0 ){
					res.json({message:'No matching document', restaurant_id:req.params.x});
				}
				if(results.length > 0 ){
					res.json({message:{"restaurant_id": results}});
					res.end();
				}
			}
			db.close();
		});
		//mongoose.createConnection(mongodbUri);
		//console.log("connected");
	});
	mongoose.connect(mongodbUri);		
});

app.post('/', function(req,res) {
	var RestSchema = require('./models/restaurant');
	var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
	var db = mongoose.connection;
	mongoose.connect(mongodbUri);
	console.log('post handle');
	db.on('error', console.error);
	db.once('open', function() {
		console.log('post handle connected ');
		var rObj = {};
		rObj.address = {};
		rObj.address.building = JSON.stringify(req.body.building);
		rObj.address.street = req.body.street;
		rObj.address.zipcode = req.body.zipcode;
		rObj.address.coord = [];
		rObj.address.coord.push(req.body.lon);
		rObj.address.coord.push(req.body.lat);
		rObj.borough = req.body.borough;
		rObj.cuisine = req.body.cuisine;
		rObj.name = req.body.name;
		rObj.restaurant_id = req.body.restaurant_id;

		var rest = mongoose.model('restaurant', RestSchema);
		var k = new rest(rObj);
		console.log('seted all var');
		k.save(function(err,results){
			console.log('start save k');
			if (err) {
				console.log("error"+err.message);
				res.end();
			}
			else {				
				db.close();
				console.log("done");
				res.json({message:'insert done', id: 
					k.id, results});
				res.end();
			}
		});
		//db.close();
	});
});

app.delete('/restaurant_id/:id',function(req,res) {
	var RestSchema = require('./models/restaurant');
	var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
	var db = mongoose.connection;
	//var restaurantSchema = require('./models/restaurant');
	//mongoose.connect('mongodb://localhost/test');
	//var db = mongoose.connection;
	db.on('error', console.error);
	console.log("v");
	db.once('open', function() {
		var rest = mongoose.model('restaurant', RestSchema);
		console.log("var end");
		rest.find({restaurant_id: req.params.id}).remove(function(err) {
			console.log('finded on');
			if (err) {
				console.log("Error");
				//res.status(500).json(err);
				//throw err;
			}
			db.close();
			if(req.params.id != null){
				console.log("success");
				res.status(200).json({message: 'delete done', id: req.params.id});
			}
			else
				res.status(200).json({message: 'Delete fail'});

		});
	});
	mongoose.connect(mongodbUri);
});

app.put('/restaurant_id/:name/:attrib/', function(req,res) {
	var criteria = {};
	criteria[req.params.attrib] = req.params.attrib_value;

	console.log("crit"+criteria);
	
	var RestSchema = require('./models/restaurant');
	var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
	var db = mongoose.connection;
	db.on('error', console.error);
	db.once('open', function () {
		console.log(",,,");
		var rest = mongoose.model('restaurant', RestSchema);
		rest.update({name:req.params.name},{$set:criteria},function(err){
			if (err) {
				console.log("Error: " + err.message);
				res.status(500).json(err);
			}
			else {
				db.close();
				res.status(200).json({message: 'update done'});
				//res.end('Done',200);
			}
		});
	});
	mongoose.connect(mongodbUri);

});

//db.close();

app.listen(process.env.PORT || 8099);