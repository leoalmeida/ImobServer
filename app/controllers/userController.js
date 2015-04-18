//var db = require('../config/mongo_database');
//var jwt = require('jsonwebtoken');
//var secret = require('../config/secret');
//var tokenManager = require('../config/token_manager');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;
var fs = require('fs');

module.exports = function(app){    
  var UserController = {
    login:  function(req, res) {
      console.log('res: ' + res.body);
      var username = req.body.username || '';
      var password = req.body.password || '';
           
      if (username == '' || password == '') { 
        return res.send(401); 
      }
            
      passport.authenticate('local-login',{
      	 successRedirect : '/profile', // redirect to the secure profile section
      	 failureRedirect : '/login', // redirect back to the signup page if there is an error
      	 failureFlash : true // allow flash messages
      })
      
      /*db.userModel.findOne({username: username}, function (err, user) {
        if (err) {
          console.log(err);
          return res.send(401);
        }
    
        if (user == undefined) {
          return res.send(401);
        }
        
        user.comparePassword(password, function(isMatch) {
          if (!isMatch) {
            console.log("Attempt failed to login with " + user.username);
            return res.send(401);
          }
    
          var token = jwt.sign({id: user._id}, secret.secretToken, { expiresInMinutes: tokenManager.TOKEN_EXPIRATION });
          
          return res.json({token:token});
        });
    
      });*/
    },
    
    logout: function(req, res) {
      if (req.user) {
        tokenManager.expireToken(req.headers);
    
        delete req.user;	
        return res.send(200);
      }
      else {
        return res.send(401);
      }
    },
    
    create: function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';
      var passwordConfirmation = req.body.passwordConfirmation || '';
    
      if (username == '' || password == '' || password != passwordConfirmation) {
        return res.send(400);
      }
       
      var user = new User({
          name:"Leonardo Almeida",
          email:"leoalmeida.rj@gmail.com",
          username: username,
          displayName: "Leonardo Almeida",
          provider: "provider value",
          hashed_password: "#$#$#$#$#$#",
          is_admin: true
      });
      
      user.save(function(err){
          if(err)
             res.json({message: "Error occured while saving"});
          else
             res.json({message: "saved successfully"});
      });
      
      /*var user = new db.userModel();
      user.username = username;
      user.password = password;
    
      user.save(function(err) {
        if (err) {
          console.log(err);
          return res.send(500);
        }	
        
        db.userModel.count(function(err, counter) {
          if (err) {
            console.log(err);
            return res.send(500);
          }
    
          if (counter == 1) {
            db.userModel.update({username:user.username}, {is_admin:true}, function(err, nbRow) {
              if (err) {
                console.log(err);
                return res.send(500);
              }
    
              console.log('First user created as an Admin');
              return res.send(200);
            });
          } 
          else {
            return res.send(200);
          }
        });
      });*/
    },
    
    getAll: function(req,res){
        User.find(function(err,users){
            if(err){
              res.send(err);
            }else{
              res.json(users);
            }
        });
    },
    
    get: function(req,res){
        var id ;
        try{
           req.params.user_id = '542674bf6f3f913d70a8e6d0';
           id = new ObjectId(req.params.user_id);
           User.findById(id,function(err,user){
              if(err){
                res.send(err);
              }
              res.json(user);
           });
        }catch(e){
           
           res.send(404);
        }
        /*
        User.find({_id:id}).exec(function(err,user){
          if(err || user.length ==0){
            res.send("Error occured");
          }
          res.json(user);
        });
        User.findById(id,function(err,user){
          if(err){
            res.send(err);
          }
          res.json(user);
        });*/
        
    },
    
    //Transfer to Angular Code
    getSettings: function(req,res){
        try{
            var id = new ObjectId(req.params.id);
            User.findById(id,function(err,user){
                if(err){
                  res.send(err);
                }else{
                    res.redirect('/user/settings');
                    /*res.render('settings.ejs',{
                        title: 'Settings',
                        user: user,
                        path: '../../',
                        urlPath: '/user'
                    });*/
                }
            });
         
        }catch(e){
                res.send(404);
        }
    },
    
    saveSettings: function(req,res){
        try{
            var id = new ObjectId(req.params.id);
            User.findById(id,function(err,user){
                if(err){
                  res.send(err);
                }
                user.displayName = req.body.displayName;
                user.local.email = req.body.email;
                req.user = user;
                user.save(function(err){
                    if(err)
                        res.send(err);
                    res.redirect('/user/' + user.id + '/settings');
                    /*res.render('settings.ejs',{
                        title: 'Settings',
                        user: user,
                        path: '../../',
                        urlPath: '/user'
                    });*/
                }); 
            });
        }catch(e){
            res.send(404);
        }
    },
    
    uploadProfilePic: function(req,res){
        // get the temporary location of the file
        console.log('####### files:'+req.body.userPhoto);
        var tmp_path = req.files.userPhoto.path;
        // set where the file should actually exists - in this case it is in the "images" directory
        var target_path = './app/workspaces/profile_pic/' + req.files.userPhoto.name;
        // move the file from the temporary location to the intended location
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err;
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) {
                    throw err;
                }else{
                    //  res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
                    var id = new ObjectId(req.user._id);
                    User.findById(id,function(err,user){
                        if(err){
                            res.send(err);
                        }
                        user.profile_pic = req.files.userPhoto.name;
                        req.user = user;
                        user.save(function(err){
                            if(err)
                                res.send(err);
                                res.render('settings.ejs',{
                                    title: 'Settings',
                                    user: user,
                                    path: '../../',
                                    urlPath: '/user'
                                });
                            });
                    });
                 };
                });
            });
    },
    
    update: function(req,res){
        var id ;
        try{
            req.params.user_id = '542674bf6f3f913d70a8e6d0';
            id = new ObjectId(req.params.user_id);
            User.findById(id,function(err,user){
                if(err){
                  res.send(err);
                }
                //user.username = req.body.username;
                user.username = "leonardo1";
            
                //user.email = req.body.email;
                user.email = "leoalmeida.rj@gmail.com";
            
                //user.name = req.body.name;
                user.name = "Leonardo Almeida";
            
                user.save(function(err){
                  if(err)
                      res.send(err);
                  res.json({message: "user  Updated successfully"});
                });
            });
        }catch(e){
           res.send(404);
        }
    },
    
    delete: function(req,res){
        var id;
        try{
           req.params.user_id = '542671276b727c766f8f0310';
           id = new ObjectId(req.params.user_id);
           User.remove({_id:id},function(err,user){
                console.log('checkpoint 4'); 
                if(err){
                   console.log("Error is:"+ err);
                   res.send(err);
                }
                res.json({message: "User deleted successfully"});
           });
        }catch(e){
           res.send(404);
        } 
    }
  };
  
  return UserController;
};
