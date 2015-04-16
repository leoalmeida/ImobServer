var mongoose = require('mongoose');
var User = mongoose.model('User');
var Document = mongoose.model('Document');
var Publish = mongoose.model('Publish');
var ObjectId = require('mongoose').Types.ObjectId;

var bcrypt = require('bcryptjs');
var mongodbOptions = { };
var config = require('../environment.js');

mongoose.connect(config.env.dbURL, mongodbOptions, function (err, res) {
    if (err) { 
        console.log('Connection refused to ' + config.env.dbURL);
        console.log(err);
    } else {
        console.log('Connection successful to: ' + config.env.dbURL);
    }
});

/*var Schema = mongoose.Schema;

// User schema
var User = new User({
        "title"   : req.body.title,
        "user_id" : req.user._id,
        "body" :  req.body.body,
        "accomodationType": req.body.accomodationType
    });

 new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});

var Publish = new Schema({
    type: { type: String, required: true },
    subtype: { type: String, required: true },
    title: { type: String, required: true },
    tags: [ {type: String} ],
    is_published: { type: Boolean, default: false },
    content: { type: String, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    synced: { type: Date, default: Date.now }
});

var Entity = new Schema({
    id: { type: String, required: true },    
    is_published: { type: Boolean, default: false },
    value: { type: String, required: true },
    tags: [ {type: String} ],
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    synced: { type: Date, default: Date.now }
});*/

// Bcrypt middleware on UserSchema
User.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(config.env.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
;
  });
});

//Password verification
User.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};


//Define Models
//var userModel = mongoose.model('User', User);
//var pubModel = mongoose.model('Publish', Publish);
//var docModel = mongoose.model('Documents', Entity);
//var clientesModel = mongoose.model('Entity', Entity);
//var imoveisModel = mongoose.model('Entity', Entity);
//var contratosModel = mongoose.model('Entity', Entity);
//var eventosModel = mongoose.model('Entity', Entity);


// Export Models
exports.userModel = User;
exports.pubModel = Publish;
exports.docModel = Document;
