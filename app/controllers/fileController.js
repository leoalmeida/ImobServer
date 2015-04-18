var multer  = require('multer')
    //, db = require('../config/mongo_database')
    , config = require('../environment.js')
    , fs = require('fs');

var mongoose = require('mongoose');
var Document = mongoose.model('Document');
//var ObjectId = require('mongoose').Types.ObjectId;
    
module.exports = function(app){  
  
  var done = false;
  
  var FilesController = {      
      sendItem: [multer({ 
          includeEmptyFields: true, 
          dest: config.env.upPath,
          rename: function (fieldname, filename) {
            console.log("Rename");
            return fieldname + filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
          },
          onFileUploadStart: function (file, req, res) {
            console.log("Start Upload call");                
            console.log(file.originalname + ' is starting ...');    
            console.log(' Request: ' +  req);    
          },
          onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to  ' + file.path);            
          }
      }), function(req, res) {
          
      console.log("Start sendItem");          
          console.log(req.files) // form files
          
          console.log(' Body: ' +  JSON.stringify(req.body));
          console.log(' Request: ' +  JSON.stringify(req.body.tags)); 
          
          var upfile = JSON.stringify(req.files);
          
          if (upfile == null) {
            console.log('Arquivo inválido');            
            return res.send(400);
          }
        
          var docEntry = new Document();          
          docEntry.id = req.files.file.name;
          docEntry.is_published = true;
          docEntry.value = upfile;
          docEntry.tags = req.tags;
          docEntry.save(function(err) {
            if (err) {
              console.log(err);
              return res.send(400);
            }
          });        
            
          var data = {};
          data.status = 201;
          data.statusMessage = "Novo documento publicado: " + docEntry.id;
          data.content = docEntry;          		
          res.send(docEntry).end("File uploaded.");        
      }
  ],
  getItem: function(fileid) {
      fs.readFile(config.env.upPath + fileid,  'base64', function(err,data) {
          if (err) {
            return console.log(err);
          }
          console.log(data);      
      });
  }};
  return FilesController;  
};  
