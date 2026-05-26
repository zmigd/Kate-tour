const City = require('../models/City');

exports.getAll = async (req, res) => { try { res.json(await City.find(req.query.country ? { country: req.query.country } : {}).populate('country', 'name')); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.create = async (req, res) => { try { res.status(201).json(await City.create(req.body)); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.update = async (req, res) => { try { res.json(await City.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.remove = async (req, res) => { try { await City.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (e) { res.status(500).json({ message: e.message }); } };
