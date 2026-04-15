import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useCourses from '../hooks/useCourses';

const inp = { padding:'0.65rem 0.9rem', border:'1.5px solid #e5e7eb', borderRadius:8, fontSize:'0.95rem', outline:'none', fontFamily:'inherit', width:'100%', boxSizing:'border-box' };

const Profile = () => {
  const { user, logout, isStudent, isMentor, updateProfile, updatePassword } = useAuth();
  const { enrolledCourses, mentorCourses } = useCourses();
  const navigate = useNavigate();
  const handleLogout = () => { navigate('/'); setTimeout(() => logout(), 50); };
  const [tab, setTab] = useState('profile'); // 'profile' | 'password'
  const [form, setForm] = useState({ name: user?.name || '', bio: user?.bio || '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  const showMsg = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg({ type:'', text:'' }), 3000); };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { showMsg('error', 'Name cannot be empty'); return; }
    setSaving(true);
    try {
      await updateProfile({ name: form.name.trim(), bio: form.bio });
      showMsg('success', 'Profile updated successfully');
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to update profile');
    } finally { setSaving(false); }
  };

  const handlePasswordSave = async (e) => {
    e.preventDefault();
    if (pwForm.newPassword.length < 6) { showMsg('error', 'New password must be at least 6 characters'); return; }
    if (pwForm.newPassword !== pwForm.confirmPassword) { showMsg('error', 'Passwords do not match'); return; }
    setSaving(true);
    try {
      await updatePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMsg('success', 'Password changed successfully');
    } catch (err) {
      showMsg('error', err.response?.data?.message || 'Failed to change password');
    } finally { setSaving(false); }
  };

  const roleColor = isMentor ? { bg:'#fef3c7', color:'#d97706' } : { bg:'#ede9fe', color:'#6366f1' };

  return (
    <div style={{ maxWidth:900, margin:'0 auto', display:'flex', flexDirection:'column', gap:'2rem' }}>

      {/* Profile card */}
      <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:20, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.06)' }}>
        <div style={{ height:120, background:'linear-gradient(135deg,#6366f1,#8b5cf6,#a78bfa)' }} />
        <div style={{ padding:'0 2rem 2rem', position:'relative' }}>
          <div style={{ width:80, height:80, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', fontSize:'2rem', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', border:'4px solid #fff', marginTop:-40, marginBottom:'1rem', boxShadow:'0 4px 12px rgba(99,102,241,0.3)' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h1 style={{ fontSize:'1.5rem', fontWeight:800, color:'#111827' }}>{user?.name}</h1>
              <p style={{ color:'#6b7280', fontSize:'0.9rem', marginTop:'0.2rem' }}>{user?.email}</p>
              {user?.bio && <p style={{ color:'#374151', fontSize:'0.875rem', marginTop:'0.4rem', maxWidth:400 }}>{user.bio}</p>}
              <span style={{ display:'inline-block', marginTop:'0.6rem', padding:'0.3rem 0.9rem', borderRadius:20, fontSize:'0.85rem', fontWeight:700, background:roleColor.bg, color:roleColor.color }}>
                {isMentor ? '🎓 Mentor' : '📚 Student'}
              </span>
            </div>
            <button onClick={handleLogout} style={{ background:'none', border:'1.5px solid #ef4444', color:'#ef4444', padding:'0.55rem 1.25rem', borderRadius:8, fontWeight:600, cursor:'pointer', fontSize:'0.875rem' }}>Log Out</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px,1fr))', gap:'1rem' }}>
        {isStudent && <>
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#6366f1' }}>{enrolledCourses.length}</div>
            <div style={{ fontSize:'0.8rem', color:'#6b7280', marginTop:'0.2rem' }}>Enrolled Courses</div>
          </div>
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#10b981' }}>
              {enrolledCourses.filter(c => c.progress?.completedAt).length}
            </div>
            <div style={{ fontSize:'0.8rem', color:'#6b7280', marginTop:'0.2rem' }}>Completed</div>
          </div>
        </>}
        {isMentor && <>
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#6366f1' }}>{mentorCourses.length}</div>
            <div style={{ fontSize:'0.8rem', color:'#6b7280', marginTop:'0.2rem' }}>Courses Created</div>
          </div>
          <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
            <div style={{ fontSize:'2rem', fontWeight:900, color:'#10b981' }}>{mentorCourses.reduce((s,c) => s+(c.studentsCount||0),0)}</div>
            <div style={{ fontSize:'0.8rem', color:'#6b7280', marginTop:'0.2rem' }}>Total Students</div>
          </div>
        </>}
        <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, padding:'1.25rem', textAlign:'center' }}>
          <div style={{ fontSize:'2rem', fontWeight:900, color:'#f59e0b' }}>
            {isStudent ? enrolledCourses.filter(c => c.progress?.completedAt).length : mentorCourses.length}
          </div>
          <div style={{ fontSize:'0.8rem', color:'#6b7280', marginTop:'0.2rem' }}>Certificates</div>
        </div>
      </div>

      {/* Edit tabs */}
      <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, overflow:'hidden' }}>
        {/* Tab bar */}
        <div style={{ display:'flex', borderBottom:'1px solid #e5e7eb' }}>
          {[['profile','✏️ Edit Profile'],['password','🔒 Change Password']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)}
              style={{ flex:1, padding:'0.85rem', border:'none', background: tab===t ? '#fff' : '#f9fafb', fontWeight: tab===t ? 700 : 500, color: tab===t ? '#6366f1' : '#6b7280', cursor:'pointer', borderBottom: tab===t ? '2px solid #6366f1' : '2px solid transparent', fontSize:'0.9rem' }}>
              {l}
            </button>
          ))}
        </div>

        <div style={{ padding:'1.75rem' }}>
          {msg.text && (
            <div style={{ background: msg.type==='success' ? '#f0fdf4' : '#fef2f2', border:`1px solid ${msg.type==='success' ? '#bbf7d0' : '#fecaca'}`, color: msg.type==='success' ? '#16a34a' : '#dc2626', padding:'0.75rem 1rem', borderRadius:8, marginBottom:'1rem', fontWeight:600, fontSize:'0.875rem' }}>
              {msg.type==='success' ? '✅' : '⚠️'} {msg.text}
            </div>
          )}

          {tab === 'profile' && (
            <form onSubmit={handleProfileSave} style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:480 }}>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>Full Name</label>
                <input style={inp} value={form.name} onChange={e => setForm({...form, name:e.target.value})} required />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>Email <span style={{ color:'#9ca3af', fontWeight:400 }}>(cannot change)</span></label>
                <input style={{ ...inp, background:'#f9fafb', color:'#9ca3af' }} value={user?.email} disabled />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>Bio <span style={{ color:'#9ca3af', fontWeight:400 }}>(optional)</span></label>
                <textarea style={{ ...inp, resize:'vertical', minHeight:80 }} value={form.bio} onChange={e => setForm({...form, bio:e.target.value})} placeholder="Tell others about yourself..." />
              </div>
              <button type="submit" disabled={saving} style={{ background: saving ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.7rem 1.75rem', borderRadius:8, fontWeight:700, cursor: saving ? 'not-allowed' : 'pointer', alignSelf:'flex-start' }}>
                {saving ? '⏳ Saving...' : '💾 Save Changes'}
              </button>
            </form>
          )}

          {tab === 'password' && (
            <form onSubmit={handlePasswordSave} style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:480 }}>
              {[['Current Password','currentPassword'],['New Password','newPassword'],['Confirm New Password','confirmPassword']].map(([label, field]) => (
                <div key={field} style={{ display:'flex', flexDirection:'column', gap:'0.35rem' }}>
                  <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>{label}</label>
                  <input style={inp} type="password" value={pwForm[field]} onChange={e => setPwForm({...pwForm, [field]:e.target.value})} required />
                </div>
              ))}
              <button type="submit" disabled={saving} style={{ background: saving ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.7rem 1.75rem', borderRadius:8, fontWeight:700, cursor: saving ? 'not-allowed' : 'pointer', alignSelf:'flex-start' }}>
                {saving ? '⏳ Saving...' : '🔒 Change Password'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ background:'#fff', border:'1px solid #e5e7eb', borderRadius:16, padding:'1.5rem' }}>
        <h2 style={{ fontSize:'1rem', fontWeight:700, color:'#111827', marginBottom:'1rem' }}>Quick Links</h2>
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          {isStudent && <Link to="/student/dashboard" style={{ background:'#ede9fe', color:'#6366f1', padding:'0.55rem 1.25rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.875rem' }}>📚 My Learning</Link>}
          {isMentor  && <Link to="/mentor/dashboard"  style={{ background:'#ede9fe', color:'#6366f1', padding:'0.55rem 1.25rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.875rem' }}>🎓 Dashboard</Link>}
          {isMentor  && <Link to="/mentor/create-course" style={{ background:'#dcfce7', color:'#16a34a', padding:'0.55rem 1.25rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.875rem' }}>+ Create Course</Link>}
          <Link to="/courses" style={{ background:'#f3f4f6', color:'#374151', padding:'0.55rem 1.25rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.875rem' }}>🔍 Browse Courses</Link>
        </div>
      </div>
    </div>
  );
};
export default Profile;
