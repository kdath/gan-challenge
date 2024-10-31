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

const City = mongoose.model('City', CitySchema)

module.exports = {
  City
}