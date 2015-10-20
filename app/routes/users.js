var express = require('express');
var router = express.Router();
var orch = require('orchestrate');
var config = require('../config');

var db = orch(config.dbKey);

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("GET request to /users");
  db.list("users")
  .then(function(result) {
    res.send(result.body.results);
  });

});

router.post("/", function(req, res, next) {
  var email = req.body.newEmail;
  var username = req.body.newUsername;
  var password = req.body.newPassword;

  var user = {"username": username, "password": password, "email": email}

  if(email.split('@') === email){
    res.render('main', {error: email + " is not a valid email address. Try again."});
  }

  db.post("users", user)
  .then(res.render('main', {user: user.username}));
});

module.exports = router;
