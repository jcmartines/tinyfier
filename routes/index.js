var express = require('express');
var router = express.Router();
var model = require('../models/schema.js');
var helpers = require('../helpers/helpers.js');



/* GET tinyURL page. */
router.get('/tinyURL', function(req, res, next) {
  res.render('tinyurlpage', { title: 'Get Tiny URL' });
});

/* POST to get the tinyURL or provide the existing one */
router.post('/tinyURL', function(req, res) {
  // Get our form fullURL value.
  var fullurl = req.body.fullurl;
  var tinyurl = helpers.makeid();//"eCvwIGoIlU";

  model.findOne({fullURL: fullurl}, function(err, tinyPairing){
    if (err) { 
      return console.log('Error inside find URL');
    } else if (tinyPairing){ // if the page exists then just print the value
      res.render('tinyurlpage', { fullurl: fullurl, tinyfied: tinyPairing.tinyURL});
    } else { //submit into the database
      helpers.insertURL(fullurl, tinyurl, function(tinyurl){
        res.render('tinyurlpage', { fullurl: fullurl, tinyfied: tinyurl});
      });
    } 
  });
});

/* GET page from tiny URL */
router.get('/:hash', function(req, res, next) {
	var hash = req.params.hash; //get the parameter passed in the URL 

  model.findOne({tinyURL: hash}, function(err, tinyPairing){
    if (err) {
      return console.log('Error inside insert into database, collisioner');
    } else if(tinyPairing) { //if tiny url is in database, then redirect to full url
      res.redirect("http://" + tinyPairing.fullURL);
    } else {
      res.send('URL does not exist!');
    }
  });  
}); //end of get

module.exports = router;
