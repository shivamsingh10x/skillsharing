import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useCourses from '../hooks/useCourses';
import CourseList from '../components/courses/CourseList';
import CourseFilters from '../components/courses/CourseFilters';

const Courses: React.FC = () => {
  const { courses, fetchCourses, loading } = useCourses();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    level: '',
    maxPrice: 100,
  });

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  // Client-side filter (all data already loaded)
  const filtered = courses.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    const matchCat = !filters.category || c.category === filters.category;
    const matchLevel = !filters.level || c.level === filters.level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
      {/* Search bar */}
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', flexWrap:'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex:1, minWidth:240, padding:'0.75rem 1rem', border:'1.5px solid #e5e7eb', borderRadius:10, fontSize:'1rem', outline:'none', fontFamily:'inherit' }}
          onFocus={e => e.target.style.borderColor='#6366f1'}
          onBlur={e => e.target.style.borderColor='#e5e7eb'}
        />
        <span style={{ fontSize:'0.875rem', color:'#6b7280', whiteSpace:'nowrap' }}>
          {loading ? 'Loading...' : `${filtered.length} course${filtered.length !== 1 ? 's' : ''} found`}
        </span>
      </div>

      <div style={{ display:'flex', gap:'1.5rem', alignItems:'flex-start', flexWrap:'wrap' }}>
        <CourseFilters filters={filters} onChange={setFilters} />
        <div style={{ flex:1 }}>
          <CourseList courses={filtered} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Courses;
