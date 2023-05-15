const path = require("path");
const ffprobe = require("ffprobe-client");
const { nanoid } = require("nanoid");

const { MediaModel } = require("../models");
const mainPath = __dirname+ "/../"+ "media";
const replicationPath =__dirname+"/../"+ "replica";
const {DEFAULT_URL,DEFAULT_TYPE} = require('../config')


async function getDimensions(path){
    return new Promise(async (resolve,reject) =>{
        try{
            const mediaMetaData = await ffprobe(fileLocation);
            console.log('mediaMetaData',mediaMetaData,fileLocation)
            if (mediaMetaData) {
              const dimension = {
                width: mediaMetaData.streams[0].width,
                height: mediaMetaData.streams[0].height,
              };
              resolve(dimension)
            }
        }catch(error){
            reject(error)
        }
    })
}



exports.addMedia = async function(fileName) {
  const fileLocation = mainPath + `./${fileName}`;
  const replicationLocation = replicationPath + `./${fileName}`;
  const uuid = nanoid();
  const URL = DEFAULT_URL+uuid;
  const dimension = await getDimensions(fileLocation);
  console.log('dimension',dimension)
  if(dimension){
    const newMedia = await MediaModel({uuid,type:DEFAULT_TYPE,URL,fileLocation,replicationLocation,dimension});
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