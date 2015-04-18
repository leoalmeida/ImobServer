var loginUtil = require('../utils/loginUtil');
    //jwt = require('express-jwt')
    //, secret = require('../config/secret')
    //, tokenManager = require('../config/token_manager');
    

module.exports = function(app){    
  var users  = app.controllers.userController;
  
  
  app.get('/users/', function(req, res) {
    res.send('respond with a resource');
  });
  
  app.post('/users/create', users.create); //Register 
  app.get('/users/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.getSettings); // Get Settings
  app.post('/users/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.saveSettings); // Change Settings
  app.post('/users/profile_pic/upload',users.uploadProfilePic); // Change Picture
  app.get('/users/',users.getAll);
  app.get('/users/:user_id',users.get);
  app.put('/users/:user_id',users.update);
  app.delete('/users/:user_id',users.delete);
  
  app.post('/users/login', users.login); //Login
  app.get('/users/logout', users.logout); //Logout
  
  


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


  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
  	  // if user is authenticated in the session, carry on 
	  if (req.isAuthenticated())
		  return next();
	
	  // if they aren't redirect them to the home page
	  res.redirect('/login');
  }
};
