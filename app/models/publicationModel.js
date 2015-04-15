var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PublishModel = new Schema({
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

mongoose.model('Publish', PublishModel);
