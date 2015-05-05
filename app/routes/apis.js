var express = require('express');
var router = express.Router();

//var apiControl = require('../controllers/apiControllers');

var loginUtil = require('../utils/loginUtil');
 
module.exports = function(app){

  var apiControl = app.controllers.apiControllers
  
  //app.get('/apis/items', jwt({secret: secret.secretToken}), tokenManager.verifyToken, apiControl.listPublished); //Get all updated items
  router.get('/items', loginUtil.isLoggedIn, apiControl.listPublished); //Get all updated items
  
  router.get('/items/all', apiControl.listAll); //Get all items
  
  router.get('/item/:id', loginUtil.isLoggedIn, apiControl.read); //get a specific item
  
  router.get('/items/tag/:id', loginUtil.isLoggedIn, apiControl.listByTag); //get item by tag
  
  router.post('/items', loginUtil.isLoggedIn , apiControl.create); //publish new items  
  
  router.put('/items', loginUtil.isLoggedIn, apiControl.update); //publish updated items  
  
  router.delete('/item/:id', loginUtil.isLoggedIn, apiControl.delete); //Delete a specific item
  
  router.delete('/items', loginUtil.isLoggedIn, apiControl.delete); //Delete all selected items 
  
  
  return router;
};
