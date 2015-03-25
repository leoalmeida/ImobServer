var jwt = require('express-jwt')
    , secret = require('../config/secret')
    , tokenManager = require('../config/token_manager');

module.exports = function(app){    
  var file = app.controllers.file;
  
  app.post('/apis/docFile', jwt({secret: secret.secretToken}), tokenManager.verifyToken, file.sendItem);
    
};
