const fs = require('fs')
const multer = require('multer')
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

function generateUploadFileNameWithOutDateNow(file) {
  return file[FILE_NAME_KEY]
}

function generateUploadFileName(file) {
  const parts = file[FILE_NAME_KEY].split('.')
  const extension = parts.pop()

  return `${parts.join('')}-${Date.now()}.${extension}`
}

/**
 * @function multerConfig
 * @param folder
 * @returns {multer.Instance | *}
 */
function multerConfig(folder) {
    if (!fs.existsSync(folder)) fs.mkdirSync(folder)
    return multer({ storage })
  }
module.exports = multerConfig