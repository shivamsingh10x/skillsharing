import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const studentLinks = [
  { to:'/student/dashboard', label:'📊 Overview' },
  { to:'/courses', label:'🔍 Browse Courses' },
  { to:'/profile', label:'👤 Profile' },
];
const mentorLinks = [
  { to:'/mentor/dashboard', label:'📊 Overview' },
  { to:'/mentor/create-course', label:'➕ Create Course' },
  { to:'/profile', label:'👤 Profile' },
];

const Sidebar = () => {
  const { isStudent } = useAuth();
  const { pathname } = useLocation();
  const links = isStudent ? studentLinks : mentorLinks;
  return (
    <aside style={{ width:220, minHeight:'calc(100vh - 64px)', background:'#f9fafb', borderRight:'1px solid #e5e7eb', padding:'1.5rem 0.75rem', flexShrink:0 }}>
      {links.map(l => (
        <Link key={l.to} to={l.to} style={{
          display:'block', padding:'0.65rem 1rem', borderRadius:8, textDecoration:'none',
          fontWeight:500, fontSize:'0.9rem', marginBottom:'0.25rem',
          background: pathname === l.to ? '#6366f1' : 'transparent',
          color: pathname === l.to ? '#fff' : '#374151',
        }}>{l.label}</Link>
      ))}
    </aside>
  );
};
export default Sidebar;
