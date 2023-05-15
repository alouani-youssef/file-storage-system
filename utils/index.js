const fs = require('fs');
const path = require('path')
const multer = require('multer');
const {MAX_FILE_SIZE , SUPPORTED_FORMATS } = require('../config')
const FILE_NAME_KEY = 'originalname'
const mainFolder = __dirname + '/../' + 'media';
const replicationFolder = __dirname + '/../' + 'replica';
(function createStorageFolder() {
  if (!fs.existsSync(mainFolder)) fs.mkdirSync(mainFolder)
  if (!fs.existsSync(replicationFolder)) fs.mkdirSync(replicationFolder)

})()

const storage = multer.diskStorage({
  destination(req, file, next) {
    next(null, mainFolder)
  },
  filename(req, file, next) {
    next(null, generateUploadFileName(file))
  }
})
function generateUploadFileName(file) {
  const parts = file[FILE_NAME_KEY].split('.')
  const extension = parts.pop()

  return `${parts.join('').trim()}-${Date.now()}.${extension}`
}

function fileFilter(req, file, callback) {
  if (!(SUPPORTED_FORMATS.some(extension => 
      path.extname(file.originalname).toUpperCase() === `.${extension}`)
  )) {
      return callback(new Error(`Extension not allowed, accepted extensions are ${SUPPORTED_FORMATS.join(',')}`))
  }
  callback(null, true)
}


/**
 * @function multerConfig
 * @param folder
 * @returns {multer.Instance | *}
 */
function multerConfig(folder) {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder)
    return multer({ storage, limits:{ fileSize:  MAX_FILE_SIZE} ,fileFilter:fileFilter})
}
module.exports = multerConfig