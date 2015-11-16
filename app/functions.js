var bcrypt = require('bcryptjs');
var Q = require('q');
var config = {};
if (process.env.HEROKU) {
	config.dbKey = process.env.DBKEY;
} else {
  config = require('./config');
};
var db = require('orchestrate')(config.dbKey); //config.dbKey holds Orchestrate token

//used in local-signup strategy
exports.localReg = function (username, password, email, firstName, lastName) {
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "username": username,
    "password": hash,
    "email": email,
    "firstName": firstName,
    "lastName": lastName
  }

  //check if username is already assigned in our database
  db.get('local-users', username)
  .then(function (result){ //case in which user already exists in db
    console.log('username already exists');
    deferred.resolve(false); //username already exists
  })
  .fail(function (result) {//case in which user does not already exist in db
      console.log(result.body);
      if (result.body.message == 'The requested items could not be found.'){
        console.log('Username is free for use');
        db.put('local-users', username, user)
        .then(function () {

          console.log("USER: " + user);
          deferred.resolve(user);
        })
        .fail(function (err) {
          console.log("PUT FAIL:" + err.body);
          deferred.reject(new Error(err.body));
        });
      } else {
        deferred.reject(new Error(result.body));
      }
  });

  return deferred.promise;
};

//check if user exists
    //if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
      //if password matches take into website
  //if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function (username, password) {
  var deferred = Q.defer();

  db.get('local-users', username)
  .then(function (result){
    console.log("FOUND USER");
    var hash = result.body.password;
    console.log(hash);
    console.log(bcrypt.compareSync(password, hash));
    if (bcrypt.compareSync(password, hash)) {
      deferred.resolve(result.body);
    } else {
      console.log("PASSWORDS NOT MATCH");
      deferred.resolve(false);
    }
  }).fail(function (err){
    if (err.body.message == 'The requested items could not be found.'){
          console.log("COULD NOT FIND USER IN DB FOR SIGNIN");
          deferred.resolve(false);
    } else {
      deferred.reject(new Error(err));
    }
  });

  return deferred.promise;
};
exports.fbAuth = function (profile, done) {
  //db.deleteCollection('fb-users');
   var user = {
     "id": profile["id"],
     "username": profile["name"].givenName,
     "firstName": profile["name"].givenName,
     "lastName": profile["name"].familyName,
     "email": profile.emails[0].value || null
   };
   db.get('fb-users', profile["id"])
   .then(function (result) {
     return done(null, user);
   })
   .fail(function (result) {
     db.put('fb-users', profile["id"], user)
     .then(function (result) {
       return done(null, user);
     });
   });
};
