var http = require('http');
var url  = require('url');
var express = require('express');
var app = express();
//var bodyParser = require('body-parser');
var RestSchema = require('./models/restaurant');
console.log("hello");

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } },
                 };

var mongodbUri = 'mongodb://chia1234:ouhk@ds061984.mongolab.com:61984/ouhk';
//db = mongojs('mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk', ["restaurant"], {authMechanism: 'ScramSHA1'});

//mongoose.connect(mongodbURL);
//var db = mongoose.connection;
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function() {
	console.log('connected');
		var rest = mongoose.model('restaurant', RestSchema);
		rest.find({},function(err,results){
		if (err) {
			console.log("Error");
			//res.write("Error: " + err.message);
			//res.json("Error: " + err.message);
			//db.close();
			//res.write("Error Message:"+err.message);
			//res.write("write");
			//res.end("Not Found json:"+results+"\n",200);
		}
		else {
			console.log("FOund"+results);
				app.get('/res/:x', function(req,res){
				res.writeHead(200, {'Content-Type': 'text/plain'});
				res.write('xx');
				res.json({ message: 'lll'});
				res.end();
				console.log(res);
			});
			//db.close();
			//res.write('Found: ');
			
			//res.json(results);
			//res.end("Find Json::"+results+"\n",200);

		}
	});
  // Wait for the database connection to establish, then start the app.                         
});
// app.listen(process.env.PORT || 8099);