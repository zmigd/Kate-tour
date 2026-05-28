const router = require('express').Router();
const { getAllUsers, updateUserRole, deleteUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/role');

router.get('/',           protect, admin, getAllUsers);
router.patch('/:id/role', protect, admin, updateUserRole);
router.delete('/:id',     protect, admin, deleteUser);

module.exports = router;
