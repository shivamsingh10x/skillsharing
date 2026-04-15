import { createContext, useState, useCallback, useEffect } from 'react';
import {
  getCourses, getEnrolledCourses, enrollInCourse,
  getMentorCourses, markLessonComplete, getCourseProgress,
} from '../api/courseService';
import useAuth from '../hooks/useAuth';

export const CourseContext = createContext(null);

export const CourseProvider = ({ children }) => {
  const { onLogout } = useAuth();
  const [courses, setCourses]               = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [mentorCourses, setMentorCourses]   = useState([]);
  const [loading, setLoading]               = useState(false);

  // Clear user-specific data when they log out
  const clearUserData = useCallback(() => {
    setEnrolledCourses([]);
    setMentorCourses([]);
  }, []);

  useEffect(() => {
    if (onLogout) return onLogout(clearUserData);
  }, [onLogout, clearUserData]);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try { const { data } = await getCourses(); setCourses(data); }
    catch { setCourses([]); }
    finally { setLoading(false); }
  }, []);

  const fetchEnrolledCourses = useCallback(async () => {
    try { const { data } = await getEnrolledCourses(); setEnrolledCourses(data); }
    catch { setEnrolledCourses([]); }
  }, []);

  const fetchMentorCourses = useCallback(async () => {
    try { const { data } = await getMentorCourses(); setMentorCourses(data); }
    catch { setMentorCourses([]); }
  }, []);

  // Enroll in a course — calls backend, updates local state immediately
  const enroll = useCallback(async (courseId) => {
    await enrollInCourse(courseId);
    const course = courses.find(c => c.id === courseId);
    if (course && !enrolledCourses.find(c => c.id === courseId)) {
      setEnrolledCourses(prev => [...prev, { ...course, progress: { completedLessons: [], completedAt: null } }]);
    }
  }, [courses, enrolledCourses]);

  // Mark a lesson complete — saves to DB, updates local progress
  const completeLesson = useCallback(async (courseId, lessonId) => {
    const res = await markLessonComplete(courseId, lessonId);
    // Update progress in enrolledCourses state
    setEnrolledCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      return { ...c, progress: res.data.progress };
    }));
    return res.data.progress;
  }, []);

  // Get progress for a single course from DB
  const fetchProgress = useCallback((courseId) => getCourseProgress(courseId), []);

  // Add newly created course to mentor list immediately
  const addMentorCourse = useCallback((course) => {
    setMentorCourses(prev => [course, ...prev]);
  }, []);

  return (
    <CourseContext.Provider value={{
      courses, enrolledCourses, mentorCourses, loading,
      fetchCourses, fetchEnrolledCourses, fetchMentorCourses,
      enroll, completeLesson, fetchProgress,
      addMentorCourse, clearUserData,
    }}>
      {children}
    </CourseContext.Provider>
  );
};
