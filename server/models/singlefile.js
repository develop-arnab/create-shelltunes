const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const singleFileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: false
    },
    filePath: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: false
    },
    fileSize: {
      type: String,
      required: false
    },
    tags: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SingleFile', singleFileSchema);