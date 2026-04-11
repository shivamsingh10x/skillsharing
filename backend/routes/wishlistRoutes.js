const router = require('express').Router();
const { toggleWishlist, getWishlist } = require('../controllers/wishlistController');
const { protect, authorize } = require('../middleware/auth');

router.get('/',             protect, authorize('student'), getWishlist);
router.post('/:courseId',   protect, authorize('student'), toggleWishlist);

module.exports = router;
