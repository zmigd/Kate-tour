const router = require('express').Router();
const ctrl = require('../controllers/hotelController');
const { protect } = require('../middleware/auth');
const { manager } = require('../middleware/role');

router.get('/',       ctrl.getAll);
router.post('/',      protect, manager, ctrl.create);
router.put('/:id',    protect, manager, ctrl.update);
router.delete('/:id', protect, manager, ctrl.remove);

module.exports = router;
