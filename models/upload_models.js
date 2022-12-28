const mongoose = require('mongoose')

const Upload = mongoose.model('upload_models', {
    name: String,
    size: Number,
    key: String,
    url: String,
    creatAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = Upload