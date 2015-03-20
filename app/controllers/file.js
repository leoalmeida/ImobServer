var multer  = require('multer')
    , path = require('path')
    , config = require('../environment.js');   

module.exports = function(app){  
    
  var FilesController = {      
      sendItem: function(req, res) {  
        if (!req.user) {
          return res.send(401);
        }
        
        var done=false;
        
        console.log("Start Upload call");
        console.log(req)

        app.use(multer({ includeEmptyFields: true, dest: path.join(__dirname + config.env.uploadsFolder),
              rename: function (fieldname, filename) {
                console.log("Rename");
                return fieldname + filename + Date.now();
              },
              onFileUploadStart: function (file) {
                console.log(file.originalname + ' is starting ...')
              },
              onFileUploadComplete: function (file) {
                console.log(file.fieldname + ' uploaded to  ' + file.path)
                done=true;
              }
        }));
        
        console.log("After Multer");        
        
        if(done==true){
            console.log(req.files);
            res.end("File uploaded.");
        }      
      }
  };
  return FilesController;  
};  
