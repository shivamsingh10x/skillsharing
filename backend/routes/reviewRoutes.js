const router = require('express').Router();
const { createReview, getCourseReviews, deleteReview } = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/auth');

router.get('/:courseId',    getCourseReviews);
router.post('/:courseId',   protect, authorize('student'), createReview);
router.delete('/:id',       protect, deleteReview);

module.exports = router;
