require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Serve frontend static files → http://localhost:5000/
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/tours',     require('./routes/tours'));
app.use('/api/bookings',  require('./routes/bookings'));
app.use('/api/countries', require('./routes/countries'));
app.use('/api/cities',    require('./routes/cities'));
app.use('/api/hotels',    require('./routes/hotels'));
app.use('/api/services',  require('./routes/services'));
app.use('/api/upload',    require('./routes/upload'));

// Fallback → index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server: http://localhost:${PORT}`)
);
