var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
// const hash = require('../helper/hash')
var gallerySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdAt: Date,
});

let Gallery = mongoose.model('Gallerys', gallerySchema)


module.exports = Gallery