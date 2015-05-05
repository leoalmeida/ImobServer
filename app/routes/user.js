var express = require('express');
var router = express.Router();

//var users = require('../controllers/userController');
var loginUtil = require('../utils/loginUtil'); 
  
module.exports = function(app){    
  var users  = app.controllers.userController;  
  

  
  console.log("antes find: " + users );

/* Router Calls */ 
  router.get('/', function(req, res) {
      console.log('res: ' + res.body);
  //  res.send('respond with a resource');    
  });
  
  router.get('/:id/settings', users.getSettings); // Get Settings
  router.post('/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.saveSettings); // Change Settings
  router.post('/profile_pic/upload',users.uploadProfilePic); // Change Picture
  router.get('/', users.getAll);
  router.get('/:user_id',users.get);
  router.put('/:user_id',users.update);
  router.delete('/:user_id',users.delete);
  
  //router.post('/login', users.login); //Login
  //router.get('/logout', users.logout); //Logout
  //router.post('/users/create', passport.authenticate('local-signup', { successFlash: 'Welcome!' ,failureFlash: 'Invalid username or password.' })); //Register
  
  return router;
  
};
