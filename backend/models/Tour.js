const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  country:     { type: mongoose.Schema.Types.ObjectId, ref: 'Country', required: true },
  city:        { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  hotel:       { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' },
  services:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  price:       { type: Number, required: true },
  duration:    { type: Number, required: true }, // days
  startDate:   { type: Date, required: true },
  endDate:     { type: Date, required: true },
  seats:       { type: Number, required: true },
  isHot:       { type: Boolean, default: false },
  imageUrl:    { type: String },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', TourSchema);
