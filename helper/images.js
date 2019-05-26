'use strict'
require('dotenv').config()
// var multer = require('multer')

const {
  Storage
} = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const gcsname = Date.now() + req.file.originalname
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    console.log(req.file, '--------------------');

    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const Multer = require('multer'),
  multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
    // ,
    // fileFilter: function (req, file, cb) {
    //   checkFileTypes(file, cb)
    // }
    // dest: '../images'
  })

// function checkFileTypes(file, cb) {
//   const filetypes = /mp4|mpeg|3gp|flv/;

//   // Check ext
//   const path = require('path')
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

//   // check mine
//   const mimetype = filetypes.test(file.mimetype)

//   if (mimetype && extname) {
//     return cb(null, true)
//   } else {
//     cb('Error: Video Only!')
//   }
// }

module.exports = {
  getPublicUrl,
  sendUploadToGCS,
  multer
}