var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')

var projectSchema = new Schema({
    title: String,
    url: String,
    description: String,
    createdAt: Date,
});

let Project = mongoose.model('Projects', projectSchema)


module.exports = Project