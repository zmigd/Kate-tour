const Hotel = require('../models/Hotel');

exports.getAll = async (req, res) => { try { res.json(await Hotel.find(req.query.city ? { city: req.query.city } : {}).populate('city', 'name')); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.create = async (req, res) => { try { res.status(201).json(await Hotel.create(req.body)); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.update = async (req, res) => { try { res.json(await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.remove = async (req, res) => { try { await Hotel.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (e) { res.status(500).json({ message: e.message }); } };
