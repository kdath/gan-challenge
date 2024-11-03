const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    guid: String,
    cities: [{
        guid: String,
        isActive: Boolean,
        address: String,
        latitude: Number,
        longitude: Number,
        tags: [{type: String}]
    }],
    status: String,
})

const Areas = mongoose.model('Areas', AreaSchema)

exports.Areas = Areas