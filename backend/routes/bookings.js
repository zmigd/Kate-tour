const router = require('express').Router();
const ctrl = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { manager } = require('../middleware/role');

router.post('/',          protect, ctrl.createBooking);
router.get('/my',         protect, ctrl.getMyBookings);
router.get('/',           protect, manager, ctrl.getAllBookings);
router.patch('/:id',      protect, manager, ctrl.updateBookingStatus);

module.exports = router;
