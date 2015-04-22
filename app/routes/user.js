var express = require('express');
var router = express.Router();
var passport = require('passport');

var users = require('../controllers/userController');

var loginUtil = require('../utils/loginUtil'); 

module.exports = function(app){    
  console.log(users.create);
  router.get('/', function(req, res) {
      console.log('res: ' + res.body);
  //  res.send('respond with a resource');    
  });
  
  router.get('/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.getSettings); // Get Settings
  router.post('/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.saveSettings); // Change Settings
  router.post('/profile_pic/upload',users.uploadProfilePic); // Change Picture
  router.get('/',users.getAll);
  router.get('/:user_id',users.get);
  router.put('/:user_id',users.update);
  router.delete('/:user_id',users.delete);
  
  //app.post('/login', users.login); //Login
  router.get('/logout', users.logout); //Logout
  
  


  // PROFILE SECTION we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  /*app.get('/profile', isLoggedIn, function(req, res) {
    	res.render('profile.ejs', {
    		user : req.user, // get the user out of session and pass to template
            title: "Kuwait Classified App",
            path : './',
            pp: 'hello pp',
            urlPath : '/profile'
    	});
  });*/
  
};
