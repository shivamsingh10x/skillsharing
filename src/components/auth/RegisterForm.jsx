import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

const inp = (focused) => ({
  padding:'0.7rem 1rem', border:`1.5px solid ${focused ? '#6366f1' : '#e5e7eb'}`,
  borderRadius:8, fontSize:'0.95rem', outline:'none', width:'100%', fontFamily:'inherit',
  transition:'border-color 0.2s', color:'#111827',
});

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', role: ROLES.STUDENT });
  const [focused, setFocused] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim()) { setError('Please enter your full name.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const user = await register(form);
      navigate(user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleCard = (role, icon, title, desc) => (
    <button type="button" onClick={() => setForm({...form, role})}
      style={{ flex:1, padding:'1rem', border:`2px solid ${form.role === role ? '#6366f1' : '#e5e7eb'}`,
        borderRadius:12, background: form.role === role ? '#ede9fe' : '#fff',
        cursor:'pointer', textAlign:'left', transition:'all 0.2s' }}>
      <div style={{ fontSize:'1.5rem', marginBottom:'0.4rem' }}>{icon}</div>
      <div style={{ fontWeight:700, color: form.role === role ? '#6366f1' : '#111827', fontSize:'0.9rem' }}>{title}</div>
      <div style={{ fontSize:'0.78rem', color:'#6b7280', marginTop:'0.2rem' }}>{desc}</div>
    </button>
  );

  return (
    <div style={{ background:'#fff', borderRadius:20, padding:'2.5rem', width:'100%', maxWidth:480, boxShadow:'0 8px 40px rgba(0,0,0,0.1)' }}>
      <div style={{ textAlign:'center', marginBottom:'2rem' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🚀</div>
        <h1 style={{ fontSize:'1.6rem', fontWeight:800, color:'#111827' }}>Create your account</h1>
        <p style={{ color:'#6b7280', marginTop:'0.25rem' }}>Join the SkillSphere community today</p>
      </div>

      {error && (
        <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'0.75rem 1rem', borderRadius:8, marginBottom:'1.25rem', fontSize:'0.875rem' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
        {/* Role selection */}
        <div>
          <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151', display:'block', marginBottom:'0.5rem' }}>I want to</label>
          <div style={{ display:'flex', gap:'0.75rem' }}>
            {roleCard(ROLES.STUDENT, '📚', 'Learn', 'Enroll in courses and track progress')}
            {roleCard(ROLES.MENTOR, '🎓', 'Teach', 'Create courses and earn revenue')}
          </div>
        </div>

        {[['Full Name','text','name','Your full name','name'],['Email address','email','email','you@example.com','email'],['Password','password','password','Min. 6 characters','new-password'],['Confirm Password','password','confirmPassword','Repeat your password','new-password']].map(([label,type,field,ph,ac]) => (
          <div key={field} style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
            <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>{label}</label>
            <input style={inp(focused === field)} type={type} placeholder={ph} autoComplete={ac}
              value={form[field]} onChange={e => setForm({...form, [field]:e.target.value})}
              onFocus={() => setFocused(field)} onBlur={() => setFocused('')} required />
          </div>
        ))}

        <button type="submit" disabled={loading}
          style={{ background: loading ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.8rem', borderRadius:10, fontSize:'1rem', fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', marginTop:'0.5rem' }}>
          {loading ? '⏳ Creating account...' : `Create ${form.role === ROLES.MENTOR ? 'Mentor' : 'Student'} Account`}
        </button>
      </form>

      <div style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.875rem', color:'#6b7280' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color:'#6366f1', fontWeight:700, textDecoration:'none' }}>Log in</Link>
      </div>
    </div>
  );
};
export default RegisterForm;
