const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const canvasStateSchema = new Schema({
    user: String,
    version: {
        type: String,
        required: true
    },
    objects: Object,
    thumbnail: String
}, {timestamps: true});

module.exports = mongoose.model('CanvasState', canvasStateSchema);