const router = require('express').Router();
const { studentAnalytics, mentorAnalytics } = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/student', protect, authorize('student'), studentAnalytics);
router.get('/mentor',  protect, authorize('mentor'),  mentorAnalytics);

module.exports = router;
