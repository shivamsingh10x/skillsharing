import axiosInstance from './axiosConfig';

/**
 * Course service — all calls go to the real Express/MongoDB backend.
 * Base URL: http://localhost:5000/api
 */

// Category default thumbnails (Unsplash) and emoji icons — used as fallback in UI
export const CATEGORY_DEFAULTS = {
  Coding:      { emoji:'💻', thumb:'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop&auto=format' },
  Guitar:      { emoji:'🎸', thumb:'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=250&fit=crop&auto=format' },
  Dance:       { emoji:'💃', thumb:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400&h=250&fit=crop&auto=format' },
  Design:      { emoji:'🎨', thumb:'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop&auto=format' },
  Music:       { emoji:'🎵', thumb:'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=250&fit=crop&auto=format' },
  Photography: { emoji:'📷', thumb:'https://images.unsplash.com/photo-1452587996403-9d8d9a8c1b1a?w=400&h=250&fit=crop&auto=format' },
  Business:    { emoji:'💼', thumb:'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=250&fit=crop&auto=format' },
  Language:    { emoji:'🌍', thumb:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=250&fit=crop&auto=format' },
  Fitness:     { emoji:'🧘', thumb:'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop&auto=format' },
  Cooking:     { emoji:'🍳', thumb:'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400&h=250&fit=crop&auto=format' },
  Academic:    { emoji:'📖', thumb:'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop&auto=format' },
};

// Normalize backend course shape to match what the frontend expects
// Backend uses _id, frontend uses id; mentor is a populated object
const normalize = (course) => {
  if (!course) return course;
  return {
    ...course,
    id: course._id || course.id,
    mentor: course.mentor
      ? { id: course.mentor._id || course.mentor.id || course.mentor, name: course.mentor.name || '', avatar: course.mentor.avatar || `https://i.pravatar.cc/40?u=${course.mentor._id}` }
      : {},
  };
};

// GET /api/courses?search=&category=&level=&page=
export const getCourses = (params = {}) =>
  axiosInstance.get('/courses', { params }).then(res => ({
    data: (res.data.courses || []).map(normalize),
  }));

// GET /api/courses/:id
export const getCourseDetails = (id) =>
  axiosInstance.get(`/courses/${id}`).then(res => ({ data: normalize(res.data.course) }));

// POST /api/courses  (mentor only)
export const createCourse = (courseData) =>
  axiosInstance.post('/courses', courseData).then(res => ({ data: normalize(res.data.course) }));

// PUT /api/courses/:id  (mentor only)
export const updateCourse = (id, courseData) =>
  axiosInstance.put(`/courses/${id}`, courseData).then(res => ({ data: normalize(res.data.course) }));

// DELETE /api/courses/:id  (mentor only)
export const deleteCourse = (id) => axiosInstance.delete(`/courses/${id}`);

// GET /api/courses/mentor/my-courses
export const getMentorCourses = () =>
  axiosInstance.get('/courses/mentor/my-courses').then(res => ({
    data: (res.data.courses || []).map(normalize),
  }));

// GET /api/courses/student/enrolled
export const getEnrolledCourses = () =>
  axiosInstance.get('/courses/student/enrolled').then(res => ({
    data: (res.data.courses || []).map(normalize),
  }));

// POST /api/courses/:id/enroll
export const enrollInCourse = (courseId) => axiosInstance.post(`/courses/${courseId}/enroll`);

// POST /api/courses/:id/progress — mark a lesson complete
export const markLessonComplete = (courseId, lessonId) =>
  axiosInstance.post(`/courses/${courseId}/progress`, { lessonId });

// GET /api/courses/:id/progress — get student's progress for a course
export const getCourseProgress = (courseId) =>
  axiosInstance.get(`/courses/${courseId}/progress`).then(res => res.data.progress);
