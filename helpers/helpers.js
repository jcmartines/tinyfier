var model = require('../models/schema.js');

var Helpers = {
  //recursive function to insert unique tinyURL.. collision manager
  insertURL: function (fullurl, tinyurl, callback){
    model.findOne({tinyURL: tinyurl}, function(err, tinyPairing){
      if (err) {
        return console.log('Error inside insert into database, collisioner');
      } 
      if (tinyPairing) {//if exist, generate new string and call self function
        tinyurl = makeid();
        insertURL(fullurl, tinyurl, function(tinyurl){
          tinyurl = tinyurl;
          callback(tinyurl);
        });
      } else {
        var entry = new model({ //generate model
          fullURL: fullurl,
          tinyURL: tinyurl});
        //insert model created into database
        entry.save(function (err, entry) {
          if (err) {
            console.log('Error at insertion');
          } else {
              callback(tinyurl);
            }
        });
      } 
    });
  },

  //generate a random string for the URL
  makeid: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 10; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  },

};

module.exports = Helpers;
