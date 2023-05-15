const handlerService = require('./handler.service')
const RESPONSE_VERSION = '0.0.1';
const RESPONSE_MESSAGES = { BAD:'YOU REQUEST IS WRONG' };
const HTTP_CODES = { DONE:200,EMPTY:204,CREATED:201,BAD : 400, NOT_AUTHORIZED:401 };


/**
 * @function getFileById
 * @description 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getFileById= async function(req,res,next){
    try{
        if(!req.params.id){
            throw new Error('Error while fetching Media By Id')
        }
        const media = await handlerService.getFile(req.params.id);
        if(media){
            res.status(HTTP_CODES.DONE)
            res.json({success:true,version:RESPONSE_VERSION,data:media})
        }else{
            throw new Error('Error while saving media to DB')
        }
    }catch(error){
        res.status(HTTP_CODES.EMPTY)
        res.json({error:RESPONSE_MESSAGES.BAD,version:RESPONSE_VERSION})
    }
}

exports.addFile = async function(req,res,next){
    try{
        console.info('req.file.filename',req.file.filename)
        const media = await handlerService.addMedia(req.file.filename);
        if(media){
            res.status(HTTP_CODES.DONE)
            res.json({success:true,version:RESPONSE_VERSION,data:media})
        }else{
            throw new Error('Error while saving media to DB')
        }
    }catch(error){
        res.status(HTTP_CODES.EMPTY)
        res.json({error:RESPONSE_MESSAGES.BAD,version:RESPONSE_VERSION})
    }
}

exports.addFiles = async function(req,res,next){
    try{
        const medias = Promise.all(req.files.map((file) =>{
            return  handlerService.addMedia(file.filename)
        }))
        if(medias){
            res.status(HTTP_CODES.DONE)
            res.json({success:true,version:RESPONSE_VERSION,data:medias})
        }else{
            throw new Error('Error while saving media to DB')
        }
    }catch(error){
        res.status(HTTP_CODES.EMPTY)
        res.json({error:RESPONSE_MESSAGES.BAD,version:RESPONSE_VERSION})
    }
}
exports.getMedia = async function(req,res,next){
    try{
        const fileId = req.params.id;
        if(!fileId){
            throw new Error('NO ID IS PROVIDED')
        }
        const media = await handlerService.getMediaLocation(fileId.toString())
        if(media){
            if (req.query && req.query.download) {
                res.download(media.fileLocation, media.fileName);
              }
              else {
                res.sendFile(filePath);
              }
        }else{
            res.status(HTTP_CODES.EMPTY)
            res.json({})
        }
 
    }catch(error){
        res.status(HTTP_CODES.EMPTY)
        res.json({error:RESPONSE_MESSAGES.BAD,version:RESPONSE_VERSION})
    }
}