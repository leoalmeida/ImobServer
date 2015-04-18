var loginUtil = require('../utils/loginUtil');
    //jwt = require('express-jwt')
    //, secret = require('../config/secret')
    //, tokenManager = require('../config/token_manager');

module.exports = function(app){  
  var apiControl = app.controllers.apiControllers;
    
  //app.get('/apis/items', jwt({secret: secret.secretToken}), tokenManager.verifyToken, apiControl.listPublished); //Get all updated items
  app.get('/apis/items', loginUtil.isLoggedIn, apiControl.listPublished); //Get all updated items
  
  app.get('/apis/items/all', apiControl.listAll); //Get all items
  
  app.get('/apis/item/:id', loginUtil.isLoggedIn, apiControl.read); //get a specific item
  
  app.get('/apis/items/tag/:id', loginUtil.isLoggedIn, apiControl.listByTag); //get item by tag
  
  app.post('/apis/items', loginUtil.isLoggedIn , apiControl.create); //publish new items  
  
  app.put('/apis/items', loginUtil.isLoggedIn, apiControl.update); //publish updated items  
  
  app.delete('/apis/item/:id', loginUtil.isLoggedIn, apiControl.delete); //Delete a specific item
  
  app.delete('/apis/items', loginUtil.isLoggedIn, apiControl.delete); //Delete all selected items 
  
};
