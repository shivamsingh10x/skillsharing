import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCourses from '../../hooks/useCourses';
import { useState } from 'react';

const CourseCard = ({ course }) => {
  const { id, title, description, category, level, rating, studentsCount, duration, thumbnail, mentor, upcomingClass } = course;
  const { user, isStudent } = useAuth();
  const { enrolledCourses, enroll } = useCourses();
  const navigate = useNavigate();
  const [enrolling, setEnrolling] = useState(false);
  const isEnrolled = enrolledCourses.some(c => c.id === id);

  const handleEnroll = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    if (!isStudent || isEnrolled) return;
    setEnrolling(true);
    await enroll(id);
    setEnrolling(false);
  };

  return (
    <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e5e7eb', overflow:'hidden', display:'flex', flexDirection:'column', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer' }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.1)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
      onClick={() => navigate(`/courses/${id}`)}>
      {/* Thumbnail */}
      <div style={{ position:'relative' }}>
        <img src={thumbnail} alt={title} style={{ width:'100%', height:185, objectFit:'cover', display:'block' }} />
        <span style={{ position:'absolute', top:10, left:10, background:'#6366f1', color:'#fff', fontSize:'0.72rem', fontWeight:700, padding:'0.2rem 0.6rem', borderRadius:20 }}>{category}</span>
        {/* FREE badge */}
        <span style={{ position:'absolute', top:10, right:10, background:'#10b981', color:'#fff', fontSize:'0.72rem', fontWeight:800, padding:'0.2rem 0.65rem', borderRadius:20, letterSpacing:'0.05em' }}>FREE</span>
        {/* Upcoming class badge */}
        {upcomingClass && (
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'rgba(15,23,42,0.75)', backdropFilter:'blur(4px)', padding:'0.4rem 0.75rem', display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <span style={{ fontSize:'0.7rem', color:'#a5b4fc' }}>📅 Next class:</span>
            <span style={{ fontSize:'0.7rem', color:'#fff', fontWeight:600 }}>{upcomingClass.date} · {upcomingClass.time}</span>
            <span style={{ fontSize:'0.65rem', background: upcomingClass.platform === 'Zoom' ? '#2563eb' : '#16a34a', color:'#fff', padding:'0.1rem 0.4rem', borderRadius:4, marginLeft:'auto', fontWeight:700 }}>{upcomingClass.platform}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding:'1rem', display:'flex', flexDirection:'column', gap:'0.5rem', flex:1 }}>
        <div style={{ fontWeight:700, fontSize:'0.95rem', color:'#111827', lineHeight:1.4 }}>{title}</div>
        <p style={{ fontSize:'0.8rem', color:'#6b7280', lineHeight:1.45 }}>{description.slice(0,85)}...</p>
        <div style={{ display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.8rem', color:'#374151' }}>
          <img src={mentor.avatar} alt={mentor.name} style={{ width:22, height:22, borderRadius:'50%' }} />
          <span>{mentor.name}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.3rem', fontSize:'0.78rem', color:'#6b7280', flexWrap:'wrap' }}>
          <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(rating))}{'☆'.repeat(5-Math.floor(rating))}</span>
          <span style={{ fontWeight:600, color:'#374151' }}>{rating}</span>
          <span style={{ color:'#d1d5db' }}>·</span>
          <span>{studentsCount} students</span>
          <span style={{ color:'#d1d5db' }}>·</span>
          <span>{duration}</span>
        </div>

        {/* Footer row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:'0.6rem', borderTop:'1px solid #f3f4f6' }}>
          <span style={{ fontSize:'0.72rem', padding:'0.2rem 0.6rem', borderRadius:20, background:'#ede9fe', color:'#6366f1', fontWeight:600 }}>{level}</span>
          {isStudent ? (
            isEnrolled ? (
              <span style={{ fontSize:'0.78rem', color:'#16a34a', fontWeight:700 }}>✅ Enrolled</span>
            ) : (
              <button onClick={handleEnroll} disabled={enrolling}
                style={{ background: enrolling ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.35rem 0.85rem', borderRadius:8, fontSize:'0.78rem', fontWeight:700, cursor: enrolling ? 'not-allowed' : 'pointer' }}>
                {enrolling ? '...' : 'Enroll Free'}
              </button>
            )
          ) : (
            <span style={{ fontSize:'0.78rem', fontWeight:700, color:'#10b981' }}>FREE</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default CourseCard;
