// Configurations
var environment = {};

environment.server = {
                port: 3001,
                ip: 'localhost'
             };
environment.currentEnv = 'development';
environment.appName = 'imobcat';        
environment.SALT_WORK_FACTOR = 10;
environment.logstyle = 'dev';
environment.jsonType = 'application/vnd.api+json';        
environment.logPath = __dirname + "/var/log/app_" + environment.currentEnv + ".log";
environment.upPath = __dirname + "/uploads"
environment.dbURL = "mongodb://localhost:27017/" + environment.appName + "_" + environment.currentEnv;

exports.env = environment;
