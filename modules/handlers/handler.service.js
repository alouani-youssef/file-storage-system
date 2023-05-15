const ffprobe = require("ffprobe-client");
const nanoid = require('nanoid')

const { MediaModel } = require("../../models")
const { DEFAULT_LOCATIONS } = require('../../config')
const {DEFAULT_URL,DEFAULT_TYPE} = require('../../config')
const DEFAULT_VALUES = {
    DEFAULT_HEIGHT:1400,
    DEFAULT_WIDTH:920
}

async function getDimensions(path){
    return new Promise(async (resolve,reject) =>{
        try{
            const mediaMetaData = await ffprobe(path);
            if (mediaMetaData) {
              const dimension = {
                width: mediaMetaData.streams[0].width,
                height: mediaMetaData.streams[0].height,
              };
              resolve(dimension)
            }
        }catch(error){
            const dimension = {
                width: DEFAULT_VALUES.DEFAULT_WIDTH,
                height: DEFAULT_VALUES.DEFAULT_HEIGHT,
              };
              resolve(dimension)
        }
    })
}



exports.addMedia = async function(fileName) {
  const fileLocation = DEFAULT_LOCATIONS.MAIN + `/${fileName}`;
  const replicationLocation = DEFAULT_LOCATIONS.REPLICATION + `/${fileName}`;
  const uuid = nanoid();
  const URL = DEFAULT_URL+uuid;
  const dimension = await getDimensions(fileLocation);
  if(dimension){
    const newMedia = await MediaModel.create({uuid,type:DEFAULT_TYPE,URL,fileName,fileLocation,replicationLocation,dimension});
    return newMedia.toJSON();
  }
}


exports.getMediaLocation = async function(uuid){
    const media = await MediaModel.findOne({uuid});
    if(media){
        return{fileLocation: media.toJSON().fileLocation,fileName: media.toJSON().fileName}
    }else{
        throw new Error('NO FILE WITH THIS ID');
    }
}

exports.getFile = async function(uuid){
    const media = await MediaModel.findOne({uuid});
    if(media){
        return media.toJSON()
    }else{
        throw new Error('NO FILE WITH THIS ID');
    }
}