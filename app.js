var express = require('express')
    , load = require('express-load')
    , jwt = require('express-jwt')
    , ejsRender = require('ejs')
    , bodyParser = require('body-parser')
    , morgan  = require('morgan')
    , path = require('path')    
    , app = express()
    , config = require('./app/environment.js')
    , redisClient = require('./app/config/redis_database').redisClient;   

app.use(morgan());

console.log('Log file at:' + config.env.logPath);
console.log('Connecting at:' + config.env.dbURL);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


load("controllers", {cwd: 'app', verbose:true})
  .then("routes", {cwd: 'app', verbose:true})
  .into(app);


  
 
//Finilize  --------------------------------------------------------------------
app.listen(config.env.server.port);
console.log("App listening on port " + config.env.server.port);
