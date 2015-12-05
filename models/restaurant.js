//var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var restaurantSchema = new Schema({
    address : {
        street: String,
        zipcode: String,
        building: String,
        coord: [Number,Number]
        },
    borough: String,
    cuisine: String,
    grades: [{date: String, grade: String, score: Number}],
    name: String,
    restaurant_id: String
});

//module.exports = restaurantSchema;
