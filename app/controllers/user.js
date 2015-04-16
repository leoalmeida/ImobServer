var db = require('../config/mongo_database');
var jwt = require('jsonwebtoken');
var secret = require('../config/secret');
var tokenManager = require('../config/token_manager');

module.exports = function(app){    
  var UserController = {
    signin:  function(req, res) {
      console.log('res: ' + res.body);
      var username = req.body.username || '';
      var password = req.body.password || '';
           
      if (username == '' || password == '') { 
        return res.send(401); 
      }
      
      
      passport.authenticate('local-login',{
      	 successRedirect : '/profile', // redirect to the secure profile section
      	 failureRedirect : '/login', // redirect back to the signup page if there is an error
      	 failureFlash : true // allow flash messages
      })
      
      /*db.userModel.findOne({username: username}, function (err, user) {
        if (err) {
          console.log(err);
          return res.send(401);
        }
    
        if (user == undefined) {
          return res.send(401);
        }
        
        user.comparePassword(password, function(isMatch) {
          if (!isMatch) {
            console.log("Attempt failed to login with " + user.username);
            return res.send(401);
          }
    
          var token = jwt.sign({id: user._id}, secret.secretToken, { expiresInMinutes: tokenManager.TOKEN_EXPIRATION });
          
          return res.json({token:token});
        });
    
      });*/
    },
    
    logout: function(req, res) {
      if (req.user) {
        tokenManager.expireToken(req.headers);
    
        delete req.user;	
        return res.send(200);
      }
      else {
        return res.send(401);
      }
    },
    
    register: function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';
      var passwordConfirmation = req.body.passwordConfirmation || '';
    
      if (username == '' || password == '' || password != passwordConfirmation) {
        return res.send(400);
      }
       
       
      passport.authenticate('local-signup',{
        	successRedirect : '/profile', // redirect to the secure profile section
        	failureRedirect : '/signup', // redirect back to the signup page if there is an error
        	failureFlash : true // allow flash messages
      });
      /*var user = new db.userModel();
      user.username = username;
      user.password = password;
    
      user.save(function(err) {
        if (err) {
          console.log(err);
          return res.send(500);
        }	
        
        db.userModel.count(function(err, counter) {
          if (err) {
            console.log(err);
            return res.send(500);
          }
    
          if (counter == 1) {
            db.userModel.update({username:user.username}, {is_admin:true}, function(err, nbRow) {
              if (err) {
                console.log(err);
                return res.send(500);
              }
    
              console.log('First user created as an Admin');
              return res.send(200);
            });
          } 
          else {
            return res.send(200);
          }
        });
      });*/
    }
  };
  
  return UserController;
};
