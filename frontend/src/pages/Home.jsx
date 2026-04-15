import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useCourses from '../hooks/useCourses';
import CourseCard from '../components/courses/CourseCard';
import { CATEGORIES } from '../utils/constants';
import { useTheme } from '../context/ThemeContext';

const ICONS = { Coding:'💻', Music:'🎵', Guitar:'🎸', Dance:'💃', Design:'🎨', Academic:'📖', Photography:'📷', Business:'💼', Language:'🌍', Fitness:'🧘', Cooking:'🍳' };

const TESTIMONIALS = [
  { name:'Riya Sharma', role:'Student', avatar:'https://i.pravatar.cc/60?img=47', text:'I learned guitar in 3 weeks. The live Zoom classes made all the difference!', rating:5 },
  { name:'Arjun Mehta', role:'Student', avatar:'https://i.pravatar.cc/60?img=52', text:'The web dev bootcamp here is better than paid courses I tried before. Completely free is unreal.', rating:5 },
  { name:'Priya Nair', role:'Mentor', avatar:'https://i.pravatar.cc/60?img=44', text:'Creating my dance course was so easy. I now have 18 students and love teaching here.', rating:5 },
];

const SkeletonCard = () => (
  <div style={{ borderRadius:14, overflow:'hidden', background:'var(--bg2)', border:'1px solid var(--border)' }}>
    <div className="skeleton" style={{ height:180 }} />
    <div style={{ padding:'1rem', display:'flex', flexDirection:'column', gap:'0.6rem' }}>
      <div className="skeleton" style={{ height:14, width:'40%' }} />
      <div className="skeleton" style={{ height:18, width:'80%' }} />
      <div className="skeleton" style={{ height:14, width:'60%' }} />
    </div>
  </div>
);

const Home = () => {
  const { courses, fetchCourses, loading } = useCourses();
  const { dark } = useTheme();
  const heroRef = useRef(null);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  // Parallax on hero
  useEffect(() => {
    const handler = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.15}px)`;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'5rem' }}>

      {/* ── Hero ── */}
      <section style={{ position:'relative', padding:'4rem 0 2rem', overflow:'hidden' }}>
        {/* Animated background blobs */}
        <div style={{ position:'absolute', top:-100, right:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ display:'flex', alignItems:'center', gap:'3rem', flexWrap:'wrap', position:'relative', zIndex:1 }}>
          <div style={{ flex:1, minWidth:280 }} className="fade-in-up">
            <div style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background: dark ? 'rgba(99,102,241,0.2)' : '#ede9fe', color:'var(--primary)', fontSize:'0.78rem', fontWeight:700, padding:'0.35rem 1rem', borderRadius:20, marginBottom:'1.5rem', border:'1px solid rgba(99,102,241,0.3)' }}>
              🚀 Next-Gen Skill Sharing Platform
            </div>
            <h1 style={{ fontSize:'clamp(2rem,4.5vw,3.5rem)', fontWeight:900, color:'var(--text)', lineHeight:1.1, marginBottom:'1.25rem' }}>
              Learn Any Skill.<br />
              <span className="gradient-text">Teach What You Know.</span>
            </h1>
            <p style={{ color:'var(--text2)', fontSize:'1.05rem', lineHeight:1.8, maxWidth:480, marginBottom:'2rem' }}>
              A community-driven platform where real people teach real skills — coding, music, dance, design, and more. Every course is completely free.
            </p>
            <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'2.5rem' }}>
              <Link to="/courses"
                style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.9rem 2.25rem', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:'1rem', boxShadow:'0 8px 24px rgba(99,102,241,0.4)', transition:'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(99,102,241,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 8px 24px rgba(99,102,241,0.4)'; }}>
                Explore Courses →
              </Link>
              <Link to="/register"
                style={{ border:'2px solid var(--primary)', color:'var(--primary)', padding:'0.9rem 2.25rem', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:'1rem', transition:'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background='var(--primary)'; e.currentTarget.style.color='#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background=''; e.currentTarget.style.color='var(--primary)'; }}>
                Start Teaching
              </Link>
            </div>
            <div style={{ display:'flex', gap:'2.5rem', flexWrap:'wrap' }}>
              {[['48+','Active Students'],['12','Free Courses'],['8','Expert Mentors'],['100%','Free Forever']].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontSize:'1.6rem', fontWeight:900, color:'var(--text)' }}>{v}</div>
                  <div style={{ fontSize:'0.78rem', color:'var(--text2)', marginTop:'0.1rem' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image with glass overlay */}
          <div style={{ flex:1, minWidth:280, position:'relative' }} className="fade-in">
            <div ref={heroRef} style={{ willChange:'transform' }}>
              {/* Photo: Brooke Cagle on Unsplash — free to use */}
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&h=500&fit=crop&auto=format"
                alt="Students learning together"
                style={{ width:'100%', borderRadius:24, boxShadow:'0 24px 64px rgba(0,0,0,0.18)', display:'block' }} />
            </div>
            {/* Glass floating cards */}
            <div className="glass" style={{ position:'absolute', bottom:24, left:-16, borderRadius:14, padding:'0.85rem 1.1rem', display:'flex', alignItems:'center', gap:'0.6rem', boxShadow:'0 8px 24px rgba(0,0,0,0.15)', animation:'fadeInUp 0.6s 0.3s ease both' }}>
              <span style={{ fontSize:'1.4rem' }}>🎓</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.82rem', color:'var(--text)' }}>All Courses Free</div>
                <div style={{ fontSize:'0.7rem', color:'var(--text2)' }}>No credit card needed</div>
              </div>
            </div>
            <div className="glass" style={{ position:'absolute', top:24, right:-16, borderRadius:14, padding:'0.75rem 1rem', display:'flex', alignItems:'center', gap:'0.5rem', boxShadow:'0 8px 24px rgba(0,0,0,0.15)', animation:'fadeInUp 0.6s 0.5s ease both' }}>
              <span style={{ fontSize:'1.2rem' }}>⭐</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.8rem', color:'var(--text)' }}>4.8 Rating</div>
                <div style={{ fontSize:'0.68rem', color:'var(--text2)' }}>48 reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats banner ── */}
      <section style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius:20, padding:'2.5rem 2rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(99,102,241,0.15)', pointerEvents:'none' }} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(130px,1fr))', gap:'2rem', textAlign:'center', position:'relative', zIndex:1 }}>
          {[['🎓','48+','Learners'],['📚','12','Courses'],['👨‍🏫','8','Mentors'],['🌍','6','Categories'],['⭐','4.8','Avg Rating'],['💰','100%','Free']].map(([icon,val,label]) => (
            <div key={label} className="fade-in">
              <div style={{ fontSize:'1.75rem', marginBottom:'0.4rem' }}>{icon}</div>
              <div style={{ fontSize:'1.8rem', fontWeight:900, color:'#fff' }}>{val}</div>
              <div style={{ fontSize:'0.78rem', color:'#94a3b8', marginTop:'0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Categories ── */}
      <section>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:'var(--text)' }}>Browse by Category</h2>
          <p style={{ color:'var(--text2)', marginTop:'0.5rem' }}>Find the skill you want to master</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(120px,1fr))', gap:'1rem' }}>
          {CATEGORIES.filter(c => c !== 'All').map(cat => (
            <Link key={cat} to={`/courses?category=${cat}`}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', padding:'1.4rem 0.5rem', background:'var(--bg2)', border:'1.5px solid var(--border)', borderRadius:14, textDecoration:'none', color:'var(--text3)', fontWeight:600, fontSize:'0.82rem', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--primary)'; e.currentTarget.style.color='var(--primary)'; e.currentTarget.style.background=dark?'rgba(99,102,241,0.1)':'#faf5ff'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 20px rgba(99,102,241,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text3)'; e.currentTarget.style.background='var(--bg2)'; e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
              <span style={{ fontSize:'2rem' }}>{ICONS[cat] || '📚'}</span>
              <span>{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Featured Courses ── */}
      <section>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.75rem', flexWrap:'wrap', gap:'1rem' }}>
          <div>
            <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:'var(--text)' }}>Featured Courses</h2>
            <p style={{ color:'var(--text2)', marginTop:'0.3rem' }}>Handpicked by our community</p>
          </div>
          <Link to="/courses" style={{ color:'var(--primary)', fontWeight:700, fontSize:'0.9rem', border:'1.5px solid var(--primary)', padding:'0.45rem 1.1rem', borderRadius:8 }}>See all →</Link>
        </div>
        {loading ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'1.5rem' }}>
            {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'1.5rem' }}>
            {courses.slice(0,6).map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        )}
      </section>

      {/* ── How it works ── */}
      <section style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:24, padding:'3.5rem 2rem' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:'var(--text)' }}>How SkillSphere Works</h2>
          <p style={{ color:'var(--text2)', marginTop:'0.5rem' }}>Get started in minutes</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px,1fr))', gap:'2.5rem' }}>
          {[
            { icon:'📝', step:'01', title:'Create Account', desc:'Sign up as a student or mentor in under a minute. No credit card required.' },
            { icon:'🔍', step:'02', title:'Find Your Course', desc:'Browse by category, level, or search for any skill you want to learn.' },
            { icon:'📅', step:'03', title:'Join Live Classes', desc:'Attend scheduled Zoom or Google Meet sessions with your mentor.' },
            { icon:'🏆', step:'04', title:'Earn Certificate', desc:'Complete courses, earn certificates, and share on LinkedIn.' },
          ].map(s => (
            <div key={s.title} style={{ textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.75rem' }}>
              <div style={{ position:'relative' }}>
                <div style={{ width:68, height:68, borderRadius:'50%', background:'linear-gradient(135deg,#ede9fe,#ddd6fe)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.9rem' }}>{s.icon}</div>
                <span style={{ position:'absolute', top:-4, right:-4, width:22, height:22, borderRadius:'50%', background:'var(--primary)', color:'#fff', fontSize:'0.62rem', fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center' }}>{s.step}</span>
              </div>
              <h3 style={{ fontWeight:700, color:'var(--text)', fontSize:'1rem' }}>{s.title}</h3>
              <p style={{ fontSize:'0.875rem', color:'var(--text2)', lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <h2 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:'var(--text)' }}>What Our Community Says</h2>
          <p style={{ color:'var(--text2)', marginTop:'0.5rem' }}>Real stories from real learners</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px,1fr))', gap:'1.5rem' }}>
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="card-hover"
              style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1rem', boxShadow:'var(--shadow)' }}>
              <div style={{ color:'#f59e0b', fontSize:'1rem' }}>{'★'.repeat(t.rating)}</div>
              <p style={{ color:'var(--text3)', fontSize:'0.9rem', lineHeight:1.7, fontStyle:'italic' }}>"{t.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'auto' }}>
                <img src={t.avatar} alt={t.name} style={{ width:42, height:42, borderRadius:'50%' }} />
                <div>
                  <div style={{ fontWeight:700, color:'var(--text)', fontSize:'0.875rem' }}>{t.name}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text2)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gradient-bg" style={{ borderRadius:24, padding:'4rem 2rem', textAlign:'center', color:'#fff', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-30, width:250, height:250, borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
        <div style={{ position:'relative', zIndex:1 }}>
          <div style={{ fontSize:'2.5rem', marginBottom:'1rem' }}>🎓</div>
          <h2 style={{ fontSize:'clamp(1.5rem,3vw,2.2rem)', fontWeight:900 }}>Ready to Share Your Skills?</h2>
          <p style={{ opacity:0.9, marginTop:'0.75rem', fontSize:'1.05rem', maxWidth:480, margin:'0.75rem auto 0', lineHeight:1.7 }}>
            Create a course today, schedule live classes, and help others grow — completely free.
          </p>
          <div style={{ display:'flex', gap:'1rem', justifyContent:'center', marginTop:'2rem', flexWrap:'wrap' }}>
            <Link to="/register"
              style={{ background:'#fff', color:'var(--primary)', padding:'0.9rem 2.5rem', borderRadius:12, textDecoration:'none', fontWeight:800, fontSize:'1rem', boxShadow:'0 4px 20px rgba(0,0,0,0.15)', transition:'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform=''}>
              Become a Mentor — Free
            </Link>
            <Link to="/courses"
              style={{ border:'2px solid rgba(255,255,255,0.6)', color:'#fff', padding:'0.9rem 2.5rem', borderRadius:12, textDecoration:'none', fontWeight:700, fontSize:'1rem', transition:'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background=''; }}>
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
