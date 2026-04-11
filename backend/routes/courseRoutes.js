const express = require('express');
const router = express.Router();
const {
  getCourses, getCourse, createCourse, updateCourse, deleteCourse,
  enrollCourse, getEnrolledCourses, getMentorCourses,
  markLessonComplete, getProgress,
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// ── Static routes FIRST (before /:id) ────────────────────────────────────────
router.get('/student/enrolled', protect, authorize('student'), getEnrolledCourses);
router.get('/mentor/my-courses', protect, authorize('mentor'), getMentorCourses);

// ── Public ────────────────────────────────────────────────────────────────────
router.get('/', getCourses);
router.get('/:id', getCourse);

// ── Student ───────────────────────────────────────────────────────────────────
router.post('/:id/enroll',   protect, authorize('student'), enrollCourse);
router.post('/:id/progress', protect, authorize('student'), markLessonComplete);
router.get('/:id/progress',  protect, authorize('student'), getProgress);

// ── Mentor ────────────────────────────────────────────────────────────────────
router.post('/',    protect, authorize('mentor'), createCourse);
router.put('/:id',  protect, authorize('mentor'), updateCourse);
router.delete('/:id', protect, authorize('mentor'), deleteCourse);

module.exports = router;
