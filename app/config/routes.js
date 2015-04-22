var routes = require('../routes/index');
var apis = require('../routes/apis');
var user = require('../routes/user');
var file = require('../routes/file');
//var view = require('../routes/view');

module.exports = function (app,passport){
      app.use('/', routes);
      app.use('/users', user);
      app.use('/apis', apis);
      app.use('/docs', file);
}
