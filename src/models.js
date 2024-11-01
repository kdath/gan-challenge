const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  guid: String,
  isActive: Boolean,
  address: String,
  latitude: Number,
  longitude: Number,
  tags: [{ type: String }]
})

const Cities = mongoose.model('Cities', CitySchema)

module.exports = {
  Cities
}