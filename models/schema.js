var mongoose = require('mongoose'); //get the mongoose libs

//schema composed of tiny and full url
var tinySchema = new mongoose.Schema({
  fullURL: String,
  tinyURL: String
});

module.exports = mongoose.model('tinypairing', tinySchema);