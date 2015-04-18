var mongoose = require('mongoose');
var Publish = mongoose.model('Publish');
var ObjectId = require('mongoose').Types.ObjectId;

var publicFields = '_id tags type';
    
module.exports = function(app){    
  var ApiControllers = {    
      listByTag: function(req, res) {
        
        if (!req.user) {
          return res.send(401);
        }
        
        var tagName = req.params.tagName || '';
        if (tagName == '') {
          return res.send(400);
          console.log('Tag name nulo');
        }
      
        var query = Publish.find({tags: tagName, is_published: true});
        query.select(publicFields);
        query.sort('-created');
        query.exec(function(err, results) {
          if (err) {
              console.log(err);
              return res.send(400);
            }
      
            for (var postKey in results) {
              results[postKey].content = results[postKey].content.substr(0, 400);
            }
      
            return res.json(200, results);
        });
      },
      
      listPublished: function(req, res) {  
      
        if (!req.user) {
          return res.send(401);
        }
        
        var query = Publish.find({is_published: true});
      
        query.sort('-created');
        query.exec(function(err, results) {
          if (err) {
              console.log('Erro ao listar os publicados:');
              console.log(err);
              return res.send(400);  			
            }
      
            for (var postKey in results) {
              results[postKey].content = results[postKey].content.substr(0, 400);
            }
      
            return res.json(200, results);
        });
      },
      
      listAll: function(req, res) {
        
        var query = Publish.find();
        
        //query.select(publicFields);
        query.sort('-created');
        query.exec(function(err, results) {
          if (err) {
              console.log('Erro ao listar todos:');
              console.log(err);
              return res.send(400);
            }
      
            for (var postKey in results) {
              results[postKey].content = results[postKey].content.substr(0, 400);
            }
      
            return res.json(200, results);
        });
      },
      
      read: function(req, res) {
        
        if (!req.user) {
          return res.send(401);
        }
        
        var id = req.params.id || '';
        if (id == '') {
          return res.send(400);
        }
        id = new ObjectId(req.params.user_id);
        
        
        /*var query = Publish.findOne({_id: id});
        query.exec(function(err, result) {*/
        Publish.findById(id,function(err,user){
          if (err) {
              console.log('Erro ao ler:');
              console.log(err);
              return res.send(400);
            }
      
            if (result != null) {
              result.update({ $inc: { read: 1 } }, function(err, nbRows, raw) {
              return res.json(200, result);
            });
            } else {
              return res.send(400);
            }
        });
      },
      
      create: function(req, res) {
        if (!req.user) {
          return res.send(401);
        }
      
        var post = req.body.post;
        if (post == null || post.title == null || post.content == null 
          || post.tags == null) {
          console.log('Não foi enviado registro');
          console.log(post);
          return res.send(400);
        }
      
        var postEntry = new pub();
        postEntry.type = post.type;
        postEntry.subtype = post.subtype;
        postEntry.title = post.title;	
        postEntry.tags = post.tags.split(',');
        postEntry.is_published = post.is_published;
        postEntry.content = post.content;
      
        postEntry.save(function(err) {
          if (err) {
            console.log(err);
            return res.send(400);
          }
          
          var data = {};
          data.status = 200;
          data.statusMessage = "Nove item publicado: " + postEntry.title;
          data.content = {};
          data.content.type = postEntry.type;
          data.content.subtype = postEntry.subtype;
          data.content.title = postEntry.title;		
          return res.send(data);
        });
      },
      
      update: function(req, res) {
        if (!req.user) {
          return res.send(401);
        }
      
        var post = req.body.post;
      
        if (post == null || post._id == null) {
          res.send(400);
        }
      
        var updatePost = {};
      
        if (post.title != null && post.title != "") {
          updatePost.title = post.title;
        } 
      
        if (post.tags != null) {
          if (Object.prototype.toString.call(post.tags) === '[object Array]') {
            updatePost.tags = post.tags;
          }
          else {
            updatePost.tags = post.tags.split(',');
          }
        }
      
        if (post.is_published != null) {
          updatePost.is_published = post.is_published;
        }
      
        if (post.content != null && post.content != "") {
          updatePost.content = post.content;
        }
      
        updatePost.updated = new Date();
      
        Publish.update({_id: post._id}, updatePost, function(err, nbRows, raw) {
          return res.send(200);
        });
      },
      
      delete: function(req, res) {
        if (!req.user) {
          return res.send(401);
        }
      
        var id = req.params.id;
        if (id == null || id == '') {
          res.send(400);
        } 
      
        var query = Publish.findOne({_id:id});
      
        query.exec(function(err, result) {
          if (err) {
            console.log(err);
            return res.send(400);
          }
      
          if (result != null) {
            result.remove();
            return res.send(200);
          }
          else {
            return res.send(400);
          }
          
        });
      }   
  };  
  return ApiControllers;  
};  
