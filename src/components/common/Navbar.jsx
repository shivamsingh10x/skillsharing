import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';

const Navbar = () => {
  const { user, logout, isStudent, isMentor } = useAuth();
  const { dark, toggle } = useTheme();
  const { unread, notifications, markAllRead } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  const handleLogout = () => { logout(); navigate('/'); };

  // Close notif dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    textDecoration: 'none',
    color: isActive(path) ? 'var(--primary)' : 'var(--text3)',
    fontWeight: isActive(path) ? 700 : 500,
    fontSize: '0.9rem',
    padding: '0.3rem 0.5rem',
    borderRadius: 6,
    transition: 'color 0.15s',
    borderBottom: isActive(path) ? '2px solid var(--primary)' : '2px solid transparent',
  });

  const bg = dark ? '#1e293b' : '#fff';
  const border = dark ? '#334155' : '#e5e7eb';

  return (
    <nav style={{ background: bg, borderBottom: `1px solid ${border}`, position:'sticky', top:0, zIndex:200, boxShadow:'0 1px 12px rgba(0,0,0,0.07)', transition:'background 0.3s' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 1.5rem', height:66, display:'flex', alignItems:'center', gap:'1.5rem' }}>

        {/* Logo */}
        <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none', fontWeight:900, fontSize:'1.25rem', color:'var(--primary)', flexShrink:0 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1rem', boxShadow:'0 4px 12px rgba(99,102,241,0.4)' }}>🌐</div>
          <span>SkillSphere</span>
        </Link>

        {/* Desktop nav links */}
        <div style={{ display:'flex', gap:'0.25rem', flex:1, alignItems:'center' }}>
          <Link to="/courses" style={linkStyle('/courses')}>Browse</Link>
          {isStudent && <Link to="/student/dashboard" style={linkStyle('/student/dashboard')}>My Learning</Link>}
          {isStudent && <Link to="/wishlist" style={linkStyle('/wishlist')}>Wishlist</Link>}
          {isStudent && <Link to="/certificates" style={linkStyle('/certificates')}>Certificates</Link>}
          {isMentor && <Link to="/mentor/dashboard" style={linkStyle('/mentor/dashboard')}>Dashboard</Link>}
          {isMentor && <Link to="/mentor/create-course" style={{ ...linkStyle('/mentor/create-course'), color:'var(--primary)', fontWeight:700 }}>+ Create</Link>}
        </div>

        {/* Right actions */}
        <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginLeft:'auto' }}>

          {/* Dark mode toggle */}
          <button onClick={toggle} title={dark ? 'Light mode' : 'Dark mode'}
            style={{ width:36, height:36, borderRadius:10, border:`1px solid ${border}`, background:'none', cursor:'pointer', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text2)', transition:'all 0.2s' }}>
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Notification bell */}
          {user && (
            <div ref={notifRef} style={{ position:'relative' }}>
              <button onClick={() => { setNotifOpen(o => !o); if (!notifOpen) markAllRead(); }}
                style={{ width:36, height:36, borderRadius:10, border:`1px solid ${border}`, background:'none', cursor:'pointer', fontSize:'1.1rem', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', color:'var(--text2)' }}>
                🔔
                {unread > 0 && (
                  <span style={{ position:'absolute', top:4, right:4, width:16, height:16, borderRadius:'50%', background:'#ef4444', color:'#fff', fontSize:'0.6rem', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', animation:'bounceIn 0.3s ease' }}>
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="slide-down" style={{ position:'absolute', top:'calc(100% + 8px)', right:0, width:320, background: bg, border:`1px solid ${border}`, borderRadius:14, boxShadow:'0 12px 40px rgba(0,0,0,0.15)', overflow:'hidden', zIndex:300 }}>
                  <div style={{ padding:'0.85rem 1rem', borderBottom:`1px solid ${border}`, fontWeight:700, fontSize:'0.9rem', color:'var(--text)' }}>
                    Notifications
                  </div>
                  <div style={{ maxHeight:320, overflowY:'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding:'2rem', textAlign:'center', color:'var(--text2)', fontSize:'0.875rem' }}>No notifications yet</div>
                    ) : notifications.slice(0, 10).map(n => (
                      <div key={n._id} style={{ padding:'0.85rem 1rem', borderBottom:`1px solid ${border}`, background: n.read ? 'none' : (dark ? 'rgba(99,102,241,0.08)' : '#faf5ff'), cursor:'pointer' }}
                        onClick={() => { setNotifOpen(false); if (n.link) navigate(n.link); }}>
                        <div style={{ fontWeight:600, fontSize:'0.82rem', color:'var(--text)' }}>{n.title}</div>
                        <div style={{ fontSize:'0.78rem', color:'var(--text2)', marginTop:'0.2rem' }}>{n.message}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User avatar / auth buttons */}
          {user ? (
            <>
              <Link to="/profile" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none' }}>
                <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'0.9rem', boxShadow:'0 2px 8px rgba(99,102,241,0.4)' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ fontWeight:600, fontSize:'0.875rem', color:'var(--text)', display:'none' }}>{user.name}</span>
              </Link>
              <button onClick={handleLogout}
                style={{ background:'none', border:`1.5px solid ${border}`, color:'var(--text2)', cursor:'pointer', fontWeight:500, padding:'0.35rem 0.85rem', borderRadius:8, fontSize:'0.82rem', transition:'all 0.2s' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ border:'1.5px solid var(--primary)', color:'var(--primary)', padding:'0.4rem 1rem', borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.875rem' }}>Log In</Link>
              <Link to="/register" style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.45rem 1.1rem', borderRadius:8, textDecoration:'none', fontWeight:700, fontSize:'0.875rem', boxShadow:'0 4px 12px rgba(99,102,241,0.35)' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
