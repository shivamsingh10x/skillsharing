import { Link } from 'react-router-dom';
import { SOCIAL_LINKS } from '../../utils/constants';

/* SVG social icons — inline for zero dependency */
const Icons = {
  Instagram: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  GitHub: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
    </svg>
  ),
  YouTube: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
};

const SocialBtn = ({ href, Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    style={{ width:40, height:40, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'#9ca3af', textDecoration:'none', transition:'all 0.2s' }}
    onMouseEnter={e => { e.currentTarget.style.background='#6366f1'; e.currentTarget.style.color='#fff'; e.currentTarget.style.borderColor='#6366f1'; }}
    onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.08)'; e.currentTarget.style.color='#9ca3af'; e.currentTarget.style.borderColor='rgba(255,255,255,0.15)'; }}>
    <Icon />
  </a>
);

const Footer = () => (
  <footer style={{ background:'#0f172a', color:'#d1d5db', marginTop:'auto' }}>
    {/* Main footer content */}
    <div style={{ maxWidth:1200, margin:'0 auto', padding:'4rem 1.5rem 3rem', display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'3rem' }}>
      {/* Brand */}
      <div style={{ gridColumn:'span 1' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem' }}>
          <span style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem' }}>🌐</span>
          <span style={{ fontSize:'1.3rem', fontWeight:800, color:'#fff' }}>SkillSphere</span>
        </div>
        <p style={{ fontSize:'0.875rem', color:'#9ca3af', lineHeight:1.7, marginBottom:'1.5rem' }}>
          A community-driven platform where real people teach real skills. Learn coding, music, dance, design, and more — completely free.
        </p>
        {/* Social icons */}
        <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap' }}>
          <SocialBtn href={SOCIAL_LINKS.instagram} Icon={Icons.Instagram} label="Instagram" />
          <SocialBtn href={SOCIAL_LINKS.facebook} Icon={Icons.Facebook} label="Facebook" />
          <SocialBtn href={SOCIAL_LINKS.github} Icon={Icons.GitHub} label="GitHub" />
          <SocialBtn href={SOCIAL_LINKS.twitter} Icon={Icons.Twitter} label="Twitter" />
          <SocialBtn href={SOCIAL_LINKS.youtube} Icon={Icons.YouTube} label="YouTube" />
        </div>
      </div>

      {/* Platform links */}
      <div>
        <h4 style={{ color:'#fff', fontSize:'0.9rem', fontWeight:700, marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>Platform</h4>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
          {[{to:'/courses',l:'Browse Courses'},{to:'/register',l:'Become a Mentor'},{to:'/student/dashboard',l:'Student Dashboard'},{to:'/mentor/dashboard',l:'Mentor Dashboard'},{to:'/mentor/create-course',l:'Create a Course'}].map(({to,l}) => (
            <Link key={to} to={to} style={{ color:'#9ca3af', textDecoration:'none', fontSize:'0.875rem', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#9ca3af'}>{l}</Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 style={{ color:'#fff', fontSize:'0.9rem', fontWeight:700, marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>Categories</h4>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
          {['Coding','Music','Guitar','Dance','Design','Photography','Business','Language'].map(cat => (
            <Link key={cat} to={`/courses?category=${cat}`} style={{ color:'#9ca3af', textDecoration:'none', fontSize:'0.875rem', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#9ca3af'}>{cat}</Link>
          ))}
        </div>
      </div>

      {/* Account + Info */}
      <div>
        <h4 style={{ color:'#fff', fontSize:'0.9rem', fontWeight:700, marginBottom:'1rem', textTransform:'uppercase', letterSpacing:'0.05em' }}>Account</h4>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', marginBottom:'2rem' }}>
          {[{to:'/login',l:'Log In'},{to:'/register',l:'Sign Up'},{to:'/profile',l:'My Profile'}].map(({to,l}) => (
            <Link key={to} to={to} style={{ color:'#9ca3af', textDecoration:'none', fontSize:'0.875rem', transition:'color 0.2s' }}
              onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#9ca3af'}>{l}</Link>
          ))}
        </div>
        {/* Newsletter teaser */}
        <div style={{ background:'rgba(99,102,241,0.15)', border:'1px solid rgba(99,102,241,0.3)', borderRadius:10, padding:'1rem' }}>
          <p style={{ fontSize:'0.8rem', color:'#a5b4fc', fontWeight:600, marginBottom:'0.4rem' }}>🎓 All courses are FREE</p>
          <p style={{ fontSize:'0.75rem', color:'#6b7280', lineHeight:1.5 }}>No subscriptions. No hidden fees. Just learning.</p>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop:'1px solid #1e293b', padding:'1.25rem 1.5rem' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.75rem' }}>
        <span style={{ fontSize:'0.8rem', color:'#4b5563' }}>© {new Date().getFullYear()} SkillSphere. All rights reserved.</span>
        <div style={{ display:'flex', gap:'1.5rem' }}>
          {['Privacy Policy','Terms of Service','Cookie Policy'].map(t => (
            <span key={t} style={{ fontSize:'0.8rem', color:'#4b5563', cursor:'pointer' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;
