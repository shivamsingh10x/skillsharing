import React from 'react';
import CourseCard from './CourseCard';
import Loader from '../common/Loader';

const CourseList = ({ courses, loading }) => {
  if (loading) return <Loader />;
  if (!courses.length) return (
    <div style={{ textAlign:'center', padding:'4rem', color:'#6b7280' }}>
      <div style={{ fontSize:'3rem' }}>😕</div>
      <p style={{ marginTop:'1rem' }}>No courses found. Try adjusting your filters.</p>
    </div>
  );
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.5rem' }}>
      {courses.map(c => <CourseCard key={c.id} course={c} />)}
    </div>
  );
};
export default CourseList;
