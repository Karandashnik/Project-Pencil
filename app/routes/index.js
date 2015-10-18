var express = require('express');
var router = express.Router();
var orch = require('orchestrate');
var config = require('../config');

var db = orch(config.dbKey);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Penciled In' });
});

router.post('/', function(req, res, next) {

  //Intialize a variable to store active user
  var user;
  //Collect user input to match with DB data
  var username = req.body.username;
  var password = req.body.password;
  //Search the DB for a user matching inputs
  db.search("users", username)
  .then(function(result){
    //If a user was found...
    if(result.body.count > 0) {

      //Storing path to user info for convenience
      user = result.body.results[0].value
      //And if their username and password match DB's values, let 'em in
      if( (user.username === username || user.email === username) && user.password === password) {
        console.log(user.username, user.password);
        res.render('main', {user: user.username});
      } else res.render('login', {error: "We couln't find that username and password in our records. Give it another shot."});
    //FOR TESTING PURPOSES: If no user was found, give our DB some users to work with!

  } else {
    db.post("users", {"username": "Harrison", "password": "123", "email": "harrisonccole@gmail.com"});
    res.render('login', {error: "We couln't find that username and password in our records. Give it another shot."});
  }
  });

});
module.exports = router;
