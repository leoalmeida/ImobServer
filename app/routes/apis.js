var loginUtil = require('../utils/loginUtil');
    //jwt = require('express-jwt')
    //, secret = require('../config/secret')
    //, tokenManager = require('../config/token_manager');

module.exports = function(app){  
  var apiControl = app.controllers.apiControllers;
    
  //app.get('/api/items', jwt({secret: secret.secretToken}), tokenManager.verifyToken, apiControl.listPublished); //Get all updated items
  app.get('/api/items', loginUtil.isLoggedIn, apiControl.listPublished); //Get all updated items
  
  app.get('/api/items/all', apiControl.listAll); //Get all items
  
  app.get('/api/item/:id', loginUtil.isLoggedIn, apiControl.read); //get a specific item
  
  app.get('/api/items/tag/:id', loginUtil.isLoggedIn, apiControl.listByTag); //get item by tag
  
  app.post('/api/items', loginUtil.isLoggedIn , apiControl.create); //publish new items  
  
  app.put('/api/items', loginUtil.isLoggedIn, apiControl.update); //publish updated items  
  
  app.delete('/api/item/:id', loginUtil.isLoggedIn, apiControl.delete); //Delete a specific item
  
  app.delete('/api/items', loginUtil.isLoggedIn, apiControl.delete); //Delete all selected items 
  
};
