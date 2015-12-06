var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
var mongoose = require('mongoose');

//var bodyParser = require('body-parser');
var RestSchema = require('./models/restaurant');
console.log("hello");

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 3000 } },
                //replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 3000 } },
                 //};

var options = { server: { socketOptions: { keepAlive: 1} }};

var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
//var mongodbUri = 'mongodb://localhost/restaurant';

// mongoose.connect(mongodbUri);
// //mongoose.createConnection(mongodbUri);
// console.log("connected");
var db = mongoose.connection;
//var conn = mongoose.connection;
console.log("set all var clear");
console.log(mongoose.connection.readyState);

app.get('/restaurant_id/:x', function(req,res){
	console.log("start handle app.get");
	db.on('error', console.error);
	console.log("no error conn");
	
	db.once('open', function(){
		var rest = mongoose.model('restaurant', RestSchema);
		rest.find({restaurant_id: req.params.x},function(err,results){
			if (err) {
				console.log("Error");
				res.json({message:"No matching document", "restaurant_id" : req.params.x});
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
		console.log("connected");
	});
	mongoose.connect(mongodbUri);		
});





app.listen(process.env.PORT || 8099);