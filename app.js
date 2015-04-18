var fs  = require('fs')
    , express = require('express')
    , path = require('path')
    //, favicon = require('serve-favicon')
    , logger   = require('morgan')
    , load = require('express-load')
    //, ejsRender = require('ejs')
    
    , cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')    
    
    , passport = require('passport')
    , flash = require('connect-flash')
    , session = require('express-session')
    
    , config = require('./app/config/config')
    , mongoose = require("mongoose")
    
    , app = express();

var port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../Uploads')));
app.use(cookieParser()); // read cookies (needed for auth)


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// required for passport
app.use(session({ 
	secret: 'keepthisstringsecret',
	resave: true,
	saveUninitialized: false
	})
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(flash()); // use connect-flash for flash messages stored in session



 
//Finilize  --------------------------------------------------------------------

var connect = function(){
   var options = {
      server: {
         socketOptions:{
            keepAlive : 1
         }
      }
   };   
   mongoose.connect(config.db,options);
};
connect();

mongoose.connection.on('error',console.log);
mongoose.connection.on('disconnected',connect);
console.log('Mongo db connected');
 
//bootstrap models
/*fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});*/
//require('./config/passport')(passport);

load("models", {cwd: 'app', verbose:true})
  .then("controllers", {cwd: 'app', verbose:true})
  .then("routes", {cwd: 'app', verbose:true})
  .into(app);

require('./app/config/express')(app);

console.log('connected at port: ' + port);
console.log('server started');
 
module.exports = app;
