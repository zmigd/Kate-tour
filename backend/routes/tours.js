const router = require('express').Router();
const ctrl = require('../controllers/tourController');
const { protect } = require('../middleware/auth');
const { manager } = require('../middleware/role');

router.get('/',    ctrl.getTours);
router.get('/:id', ctrl.getTour);
router.post('/',   protect, manager, ctrl.createTour);
router.put('/:id', protect, manager, ctrl.updateTour);
router.delete('/:id', protect, manager, ctrl.deleteTour);

module.exports = router;
