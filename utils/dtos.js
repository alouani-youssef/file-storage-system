function getMediaDataDTO(mediaEntity){
    delete mediaEntity.fileLocation
    delete mediaEntity.replicationLocation
    delete mediaEntity.createdAt
    delete mediaEntity.updatedAt
    delete mediaEntity.id
    delete mediaEntity.image
    return mediaEntity;
}
module.exports = { getMediaDataDTO }