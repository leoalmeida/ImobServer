//var routes = require('../routes/index');
//var apis = require('../routes/apis');
//var user = require('../routes/user');
//var file = require('../routes/file');
//var view = require('../routes/view');
var load = require('express-load');

module.exports = function (app,passport){
      load("routes", {cwd: 'app', verbose:true})      
        .into(app);
        
      app.use('/', app.routes.index);
      app.use('/users', app.routes.user);
      app.use('/apis/docFile', app.routes.file);      
      app.use('/apis', app.routes.apis);
}
