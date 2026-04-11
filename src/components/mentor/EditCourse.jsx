import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCourseDetails, updateCourse } from '../../api/courseService';
import { CATEGORIES, LEVELS } from '../../utils/constants';
import Loader from '../common/Loader';

const inp = { padding:'0.65rem 0.9rem', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.95rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' };
const label = { fontSize:'0.875rem', fontWeight:600, color:'#374151' };
const field = { display:'flex', flexDirection:'column', gap:'0.4rem' };

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getCourseDetails(id).then(({ data }) => {
      setForm({
        ...data,
        classDate: data.upcomingClass?.date || '',
        classTime: data.upcomingClass?.time || '',
        classPlatform: data.upcomingClass?.platform || 'Zoom',
        classLink: data.upcomingClass?.link || '',
      });
      setLoading(false);
    });
  }, [id]);

  const set = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const upcomingClass = form.classDate ? {
      date: form.classDate, time: form.classTime || 'TBD',
      platform: form.classPlatform, link: form.classLink || '#',
    } : null;
    await updateCourse(id, { ...form, upcomingClass });
    setSuccess(true);
    setTimeout(() => navigate('/mentor/dashboard'), 1500);
    setSaving(false);
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth:720 }}>
      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
        <button onClick={() => navigate('/mentor/dashboard')} style={{ background:'none', border:'none', cursor:'pointer', color:'#6b7280', fontSize:'1.2rem' }}>←</button>
        <h1 style={{ fontSize:'1.5rem', fontWeight:800, color:'#111827' }}>Edit Course</h1>
      </div>

      {success && <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', color:'#16a34a', padding:'0.75rem', borderRadius:8, marginBottom:'1rem', fontWeight:600 }}>✅ Saved! Redirecting...</div>}

      <form onSubmit={handleSubmit} style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
        <div style={field}>
          <label style={label}>Course Title *</label>
          <input style={inp} name="title" value={form.title} onChange={set} required />
        </div>
        <div style={field}>
          <label style={label}>Description *</label>
          <textarea style={{ ...inp, resize:'vertical' }} name="description" value={form.description} onChange={set} rows={4} required />
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
          <label style={label}>Thumbnail URL</label>
          <input style={inp} name="thumbnail" value={form.thumbnail || ''} onChange={set} placeholder="https://images.unsplash.com/..." />
          {form.thumbnail && <img src={form.thumbnail} alt="Preview" style={{ marginTop:'0.5rem', height:100, objectFit:'cover', borderRadius:8, border:'1px solid #e5e7eb' }} onError={e => e.target.style.display='none'} />}
        </div>

        {/* Upcoming class scheduling */}
        <div style={{ borderTop:'1px solid #f3f4f6', paddingTop:'1.25rem' }}>
          <h3 style={{ fontSize:'1rem', fontWeight:700, color:'#111827', marginBottom:'1rem' }}>📅 Live Class Schedule</h3>
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
          <button type="button" onClick={() => navigate('/mentor/dashboard')} style={{ background:'#f3f4f6', color:'#374151', border:'none', padding:'0.65rem 1.25rem', borderRadius:8, fontWeight:600, cursor:'pointer' }}>Cancel</button>
          <button type="submit" disabled={saving} style={{ background: saving ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.65rem 1.5rem', borderRadius:8, fontWeight:700, cursor: saving ? 'not-allowed' : 'pointer' }}>
            {saving ? '⏳ Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default EditCourse;
