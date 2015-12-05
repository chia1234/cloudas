var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
app.get('/',function(request, response){ //我們要處理URL為 "/" 的HTTP GET請求
    response.end('你好！'); //作出回應
});


// //var http = require('http');
// //var url  = require('url');
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// //var RestSchema = require('./models/restaurant');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// //var mongoose = require('mongoose');

// //var RestSchema = require('./models/restaurant');
// 	// var mongodbURL = 'mongodb://chia1234:ouhk1234@ds061984.mongolab.com:61984/ouhk';
// 	// var mongoose = require('mongoose');
// 	// mongoose.connect(mongodbURL);
// 	// var db = mongoose.connection;

// app.get('/restaurant_id/:x', function(req,res){
// 	res.writeHead(200, {'Content-Type': 'text/plain'});
// 	res.write('xx');
// 	res.json({ message: 'lll'});
// 	res.end();
// });


// app.listen(process.env.PORT || 8099);