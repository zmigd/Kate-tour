const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const router   = express.Router();
const { protect } = require('../middleware/auth');
const { manager } = require('../middleware/role');

// Save to frontend/assets/images/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../frontend/assets/images'));
  },
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const name = Date.now() + '-' + Math.round(Math.random() * 1e5) + ext;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|gif|webp|avif/.test(
      path.extname(file.originalname).toLowerCase()
    );
    ok ? cb(null, true) : cb(new Error('Дозволені лише зображення (jpg, png, webp, gif)'));
  }
});

router.post('/', protect, manager, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Файл не завантажено' });
  res.json({ imageUrl: '/assets/images/' + req.file.filename });
});

module.exports = router;
