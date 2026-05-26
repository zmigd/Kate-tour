const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true },
  code:        { type: String, required: true, unique: true }, // e.g. UA, TR
  description: { type: String },
  imageUrl:    { type: String }
});

module.exports = mongoose.model('Country', CountrySchema);
