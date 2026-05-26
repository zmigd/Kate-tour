const manager = (req, res, next) => {
  if (req.user && req.user.role === 'manager') return next();
  res.status(403).json({ message: 'Access denied: managers only' });
};

module.exports = { manager };
