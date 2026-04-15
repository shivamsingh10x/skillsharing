import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const inp = (focused) => ({
  padding:'0.7rem 1rem', border:`1.5px solid ${focused ? '#6366f1' : '#e5e7eb'}`,
  borderRadius:8, fontSize:'0.95rem', outline:'none', width:'100%', fontFamily:'inherit',
  transition:'border-color 0.2s', color:'#111827',
});

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email:'', password:'' });
  const [focused, setFocused] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
      navigate(user.role === 'mentor' ? '/mentor/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background:'#fff', borderRadius:20, padding:'2.5rem', width:'100%', maxWidth:440, boxShadow:'0 8px 40px rgba(0,0,0,0.1)' }}>
      {/* Header */}
      <div style={{ textAlign:'center', marginBottom:'2rem' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🎓</div>
        <h1 style={{ fontSize:'1.6rem', fontWeight:800, color:'#111827' }}>Welcome back</h1>
        <p style={{ color:'#6b7280', marginTop:'0.25rem' }}>Log in to your SkillSphere account</p>
      </div>

      {error && (
        <div style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'0.75rem 1rem', borderRadius:8, marginBottom:'1.25rem', fontSize:'0.875rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
          <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>Email address</label>
          <input
            style={inp(focused === 'email')}
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused('')}
            required
            autoComplete="email"
          />
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <label style={{ fontSize:'0.875rem', fontWeight:600, color:'#374151' }}>Password</label>
          </div>
          <input
            style={inp(focused === 'password')}
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ background: loading ? '#a5b4fc' : '#6366f1', color:'#fff', border:'none', padding:'0.8rem', borderRadius:10, fontSize:'1rem', fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer', marginTop:'0.5rem', transition:'background 0.2s' }}
        >
          {loading ? '⏳ Logging in...' : 'Log In'}
        </button>
      </form>

      <div style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.875rem', color:'#6b7280' }}>
        Don't have an account?{' '}
        <Link to="/register" style={{ color:'#6366f1', fontWeight:700, textDecoration:'none' }}>Create one free</Link>
      </div>
    </div>
  );
};
export default LoginForm;
