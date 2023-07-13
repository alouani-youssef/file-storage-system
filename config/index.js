const path = require('path')
exports.PORT = 60014;
exports.ENV_MODE = 'dev'
exports.DEFAULT_URL = 'http://146.190.121.194:60014/media/v1.0.0/file/';
exports.DEFAULT_TYPE = 'MEDIA:IMAGE';
exports.MAX_FILE_SIZE = (32 * 1024 * 1024) // 32MB;
exports.SUPPORTED_FORMATS = ['JPEG','JPNG','PDF','XLSX','CSV','DOC','MP3','MP4','GIF','HEIC','JPG','PNG']
exports.MONGODB_URI = "mongodb://127.0.0.1:27017/media"
exports.DEFAULT_LOCATIONS = {
    MAIN:path.join(__dirname,'..', 'media'),
    REPLICATION:path.join(__dirname,'..', 'replica'),
}