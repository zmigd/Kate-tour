const Country = require('../models/Country');

exports.getAll    = async (req, res) => { try { res.json(await Country.find()); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.create    = async (req, res) => { try { res.status(201).json(await Country.create(req.body)); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.update    = async (req, res) => { try { const c = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json(c); } catch (e) { res.status(400).json({ message: e.message }); } };
exports.remove    = async (req, res) => { try { await Country.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (e) { res.status(500).json({ message: e.message }); } };
