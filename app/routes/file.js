var express = require('express');
var router = express.Router();

var file = require('../controllers/fileController');

var loginUtil = require('../utils/loginUtil');
    //jwt = require('express-jwt')
    //, secret = require('../config/secret')
    //, tokenManager = require('../config/token_manager');

module.exports = function(app){    
  
  router.post('/docFile', loginUtil.isLoggedIn, file.sendItem);
  
  router.get('/docFile/:id', loginUtil.isLoggedIn, file.getItem);
    
};
