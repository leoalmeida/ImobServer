var loginUtil = require('../utils/loginUtil');
    //jwt = require('express-jwt')
    //, secret = require('../config/secret')
    //, tokenManager = require('../config/token_manager');

module.exports = function(app){    
  var file = app.controllers.fileController;
  
  app.post('/apis/docFile', loginUtil.isLoggedIn, file.sendItem);
  
  app.get('/apis/docFile/:id', loginUtil.isLoggedIn, file.getItem);
    
};
