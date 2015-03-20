var jwt = require('express-jwt')
    , secret = require('../config/secret')
    , tokenManager = require('../config/token_manager');

module.exports = function(app){    
  var user = app.controllers.user;
  
  app.post('/users/register', user.register); //Register 
  
  app.post('/users/signin', user.signin); //Login
  
  app.get('/users/logout', jwt({secret: secret.secretToken}), user.logout); //Logout
  
};
