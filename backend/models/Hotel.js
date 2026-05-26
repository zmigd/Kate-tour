const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  city:    { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
  stars:   { type: Number, min: 1, max: 5 },
  imageUrl:{ type: String },
  amenities: [String]
});

module.exports = mongoose.model('Hotel', HotelSchema);
