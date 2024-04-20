const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    image: String
},
{
    timestamps: true
})

module.exports = mongoose.model('Image', ImageSchema)