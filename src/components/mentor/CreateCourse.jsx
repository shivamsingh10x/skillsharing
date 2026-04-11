import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse, CATEGORY_DEFAULTS } from '../../api/courseService';
import { CATEGORIES, LEVELS } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';
import useCourses from '../../hooks/useCourses';

const inp = { padding:'0.7rem 1rem', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.95rem', outline:'none', fontFamily:'inherit', width:'100%', color:'#111827', boxSizing:'border-box' };
const label = { fontSize:'0.875rem', fontWeight:600, color:'#374151' };
const field = { display:'flex', flexDirection:'column', gap:'0.4rem' };

const CreateCourse = () => {
  const { user } = useAuth();
  const { addMentorCourse } = useCourses();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title:'', description:'', category:'Coding', level:'Beginner', thumbnail:'',
    classDate:'', classTime:'', classPlatform:'Zoom', classLink:'',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.title.trim()) { setError('Course title is required.'); return; }
    if (!form.description.trim()) { setError('Description is required.'); return; }
    setLoading(true);
    try {
      const upcomingClass = form.classDate ? {
        date: form.classDate, time: form.classTime || 'TBD',
        platform: form.classPlatform, link: form.classLink || '#',
      } : null;
      // Use category default thumbnail if none provided
      const thumbnail = form.thumbnail.trim() || CATEGORY_DEFAULTS[form.category]?.thumb || '';
      const { data: newCourse } = await createCourse({
        ...form,
        thumbnail,
        price: 0, isFree: true,
        mentor: { id: user.id, name: user.name, avatar: `https://i.pravatar.cc/40?u=${user.id}` },
        lessons: [], duration: '0 hours',
        upcomingClass,
      });
      addMentorCourse(newCourse);
      setSuccess(true);
      setTimeout(() => navigate('/mentor/dashboard'), 1200);
    } catch {
      setError('Failed to create course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth:720 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
        <button onClick={() => navigate('/mentor/dashboard')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7280', fontSize:'1.2rem' }}>←</button>
        <h1 style={{ fontSize:'1.5rem', fontWeight:800, color:'#111827' }}>Create New Course</h1>
      </div>

      {success && <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#16a34a', padding:'0.85rem 1rem', borderRadius:8, marginBottom:'1rem', fontWeight:600 }}>✅ Course created! Redirecting...</div>}
      {error && <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'0.85rem 1rem', borderRadius:8, marginBottom:'1rem' }}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
        <div style={field}>
          <label style={label}>Course Title *</label>
          <input style={inp} name="title" value={form.title} onChange={set} placeholder="e.g. Complete Guitar Masterclass for Beginners" required />
        </div>

        <div style={field}>
          <label style={label}>Description *</label>
          <textarea style={{ ...inp, resize:'vertical', minHeight:100 }} name="description" value={form.description} onChange={set} placeholder="What will students learn? What makes this course special?" required />
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:'1rem' }}>
          <div style={field}>
            <label style={label}>Category</label>
            <select style={inp} name="category" value={form.category} onChange={set}>
              {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={field}>
            <label style={label}>Level</label>
            <select style={inp} name="level" value={form.level} onChange={set}>
              {LEVELS.map(l => <option key={l}>{l}</option>)}
            </select>
          </div>
        </div>

        <div style={field}>
          <label style={label}>Thumbnail URL <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional — category image used if blank)</span></label>
          <input style={inp} name="thumbnail" value={form.thumbnail} onChange={set} placeholder="https://images.unsplash.com/..." />
          {/* Show custom preview or category default */}
          <div style={{ marginTop:'0.5rem', position:'relative', height:100, borderRadius:8, overflow:'hidden', border:'1px solid #e5e7eb', background:'#f3f4f6' }}>
            <img
              src={form.thumbnail.trim() || CATEGORY_DEFAULTS[form.category]?.thumb}
              alt="Thumbnail preview"
              style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              onError={e => e.target.style.display='none'}
            />
            {!form.thumbnail.trim() && (
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontSize:'2.5rem', opacity:0.6 }}>
                {CATEGORY_DEFAULTS[form.category]?.emoji || '📚'}
              </div>
            )}
            {!form.thumbnail.trim() && (
              <span style={{ position:'absolute', bottom:6, right:8, fontSize:'0.68rem', color:'#fff', background:'rgba(0,0,0,0.5)', padding:'0.1rem 0.4rem', borderRadius:4 }}>auto</span>
            )}
          </div>
        </div>

        {/* Upcoming class scheduling */}
        <div style={{ borderTop:'1px solid #f3f4f6', paddingTop:'1.25rem' }}>
          <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#111827', marginBottom:'1rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>📅 Schedule a Live Class <span style={{ fontSize:'0.78rem', color:'#9ca3af', fontWeight:400 }}>(optional)</span></h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:'1rem' }}>
            <div style={field}>
              <label style={label}>Date</label>
              <input style={inp} type="date" name="classDate" value={form.classDate} onChange={set} />
            </div>
            <div style={field}>
              <label style={label}>Time</label>
              <input style={inp} type="time" name="classTime" value={form.classTime} onChange={set} />
            </div>
            <div style={field}>
              <label style={label}>Platform</label>
              <select style={inp} name="classPlatform" value={form.classPlatform} onChange={set}>
                <option>Zoom</option>
                <option>Google Meet</option>
                <option>Microsoft Teams</option>
              </select>
            </div>
          </div>
          <div style={{ ...field, marginTop:'1rem' }}>
            <label style={label}>Meeting Link</label>
            <input style={inp} name="classLink" value={form.classLink} onChange={set} placeholder="https://zoom.us/j/... or https://meet.google.com/..." />
          </div>
        </div>

        <div style={{ display:'flex', gap:'0.75rem', justifyContent:'flex-end', paddingTop:'0.5rem', borderTop:'1px solid #f3f4f6' }}>
          <button type="button" onClick={() => navigate('/mentor/dashboard')} style={{ background:'#f3f4f6', color:'#374151', border:'none', padding:'0.7rem 1.5rem', borderRadius:8, fontWeight:600, cursor:'pointer' }}>Cancel</button>
          <button type="submit" disabled={loading} style={{ background: loading ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.7rem 2rem', borderRadius:8, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? '⏳ Creating...' : '🚀 Publish Course'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default CreateCourse;
