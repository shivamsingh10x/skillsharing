import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

const useCourses = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourses must be used inside CourseProvider');
  return ctx;
};
export default useCourses;
