const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tour:      { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  persons:   { type: Number, required: true, min: 1 },
  totalPrice:{ type: Number, required: true },
  status:    { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  notes:     { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
