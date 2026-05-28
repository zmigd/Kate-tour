const manager = (req, res, next) => {
  if (req.user && (req.user.role === 'manager' || req.user.role === 'admin')) return next();
  res.status(403).json({ message: 'Access denied: managers only' });
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') return next();
  res.status(403).json({ message: 'Access denied: admins only' });
};

module.exports = { manager, admin };
