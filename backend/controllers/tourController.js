const Tour = require('../models/Tour');

exports.getTours = async (req, res) => {
  try {
    const { country, minPrice, maxPrice, startDate, isHot, search } = req.query;
    const filter = {};
    if (country)   filter.country  = country;
    if (isHot)     filter.isHot    = isHot === 'true';
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice)  filter.price.$gte = Number(minPrice);
    if (maxPrice)  filter.price.$lte = Number(maxPrice);
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (search)    filter.title = { $regex: search, $options: 'i' };

    const tours = await Tour.find(filter)
      .populate('country', 'name')
      .populate('city', 'name')
      .populate('hotel', 'name stars')
      .sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id)
      .populate('country')
      .populate('city')
      .populate('hotel')
      .populate('services');
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });
    res.json({ message: 'Tour deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
