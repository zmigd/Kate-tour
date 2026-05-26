const Booking = require('../models/Booking');
const Tour    = require('../models/Tour');
const { sendMail } = require('../utils/mailer');

exports.createBooking = async (req, res) => {
  try {
    const { tourId, persons, notes } = req.body;
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    if (tour.seats < persons) return res.status(400).json({ message: 'Not enough seats' });

    const totalPrice = tour.price * persons;
    const booking = await Booking.create({ user: req.user._id, tour: tourId, persons, totalPrice, notes });

    tour.seats -= persons;
    await tour.save();

    await sendMail({
      to: req.user.email,
      subject: 'Booking confirmed',
      text: `Your booking for "${tour.title}" is confirmed. Total: ${totalPrice} UAH.`
    }).catch(() => {}); // don't fail if email is not configured

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('tour', 'title startDate endDate price imageUrl')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('tour', 'title startDate')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('user', 'email').populate('tour', 'title');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await sendMail({
      to: booking.user.email,
      subject: `Booking ${booking.status}`,
      text: `Your booking for "${booking.tour.title}" status changed to: ${booking.status}.`
    }).catch(() => {});

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
