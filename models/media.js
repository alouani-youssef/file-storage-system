const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mediaSchema = new Schema({
    uuid:{ type: String, required: true},
    fileName:{ type: String, required: true},
    type:{ type: String, required: true},
    dimension:{ type: Object, required: true},
    URL:{ type: String, required: true},
    fileLocation:{ type: String, required: true},
    replicationLocation:{ type: String, required: true}
},{
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
      },
    },

});
module.exports = mediaSchema
  