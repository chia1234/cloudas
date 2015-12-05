//var http = require('http');
//var url  = require('url');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var RestSchema = require('./models/restaurant');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//var mongoose = require('mongoose');

//var RestSchema = require('./models/restaurant');
	// var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
	// var mongoose = require('mongoose');
	// mongoose.connect(mongodbURL);
	// var db = mongoose.connection;

app.get('/restaurant_id/:x', function(req,res){
	
	res.write('xx');
	res.json({ message: 'lll'});
	res.end("end",200);
});


app.listen(process.env.PORT || 8099);