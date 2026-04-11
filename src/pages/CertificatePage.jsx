import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const CertificatePage = () => {
  const { user } = useAuth();
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/certificates/my')
      .then(r => setCerts(r.data.certificates || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = (cert) => {
    const win = window.open('', '_blank');
    win.document.write(`
      <!DOCTYPE html><html><head>
      <title>Certificate — ${cert.course?.title}</title>
      <style>
        body { margin:0; font-family: Georgia, serif; background: #fff; }
        .cert { width:900px; margin:40px auto; padding:60px; border:8px solid #6366f1; border-radius:16px; text-align:center; position:relative; }
        .cert::before { content:''; position:absolute; inset:12px; border:2px solid #a78bfa; border-radius:10px; pointer-events:none; }
        .logo { font-size:2rem; font-weight:900; color:#6366f1; margin-bottom:8px; }
        .title { font-size:2.5rem; font-weight:900; color:#0f172a; margin:24px 0 8px; }
        .sub { font-size:1.1rem; color:#6b7280; margin-bottom:32px; }
        .name { font-size:2.2rem; font-weight:700; color:#6366f1; border-bottom:3px solid #6366f1; display:inline-block; padding-bottom:4px; margin:16px 0; }
        .course { font-size:1.4rem; font-weight:600; color:#0f172a; margin:16px 0; }
        .meta { display:flex; justify-content:space-around; margin-top:40px; font-size:0.9rem; color:#6b7280; }
        .meta div { text-align:center; }
        .meta strong { display:block; color:#0f172a; font-size:1rem; margin-bottom:4px; }
        .id { margin-top:24px; font-size:0.75rem; color:#9ca3af; }
        @media print { body { -webkit-print-color-adjust: exact; } }
      </style></head><body>
      <div class="cert">
        <div class="logo">🌐 SkillSphere</div>
        <div class="title">Certificate of Completion</div>
        <div class="sub">This is to certify that</div>
        <div class="name">${cert.student?.name || user?.name}</div>
        <div class="sub">has successfully completed the course</div>
        <div class="course">${cert.course?.title}</div>
        <div class="meta">
          <div><strong>${cert.mentor?.name || 'Mentor'}</strong>Instructor</div>
          <div><strong>${new Date(cert.issuedAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}</strong>Date Issued</div>
          <div><strong>${cert.course?.category || ''}</strong>Category</div>
        </div>
        <div class="id">Certificate ID: ${cert.certificateId}</div>
        <div class="id">Verify at: ${window.location.origin}/certificates/verify/${cert.certificateId}</div>
      </div>
      <script>window.onload = () => { window.print(); }</script>
      </body></html>
    `);
    win.document.close();
  };

  if (loading) return <Loader fullPage />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
      <div>
        <h1 style={{ fontSize:'1.75rem', fontWeight:900, color:'var(--text)' }}>🏆 My Certificates</h1>
        <p style={{ color:'var(--text2)', marginTop:'0.3rem' }}>Your earned certificates — download, share, or verify</p>
      </div>

      {certs.length === 0 ? (
        <div style={{ background:'var(--bg2)', border:'2px dashed var(--border)', borderRadius:16, padding:'4rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>🎓</div>
          <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:'0.5rem' }}>No certificates yet</h3>
          <p style={{ color:'var(--text2)', marginBottom:'1.5rem' }}>Complete all lessons in a course to earn your certificate.</p>
          <Link to="/courses" style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.7rem 1.75rem', borderRadius:10, fontWeight:700 }}>
            Browse Courses
          </Link>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:'1.5rem' }}>
          {certs.map(cert => (
            <div key={cert._id} className="card-hover"
              style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', boxShadow:'var(--shadow)' }}>
              {/* Certificate preview */}
              <div style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', padding:'2rem', textAlign:'center', color:'#fff', position:'relative' }}>
                <div style={{ position:'absolute', inset:8, border:'2px solid rgba(255,255,255,0.3)', borderRadius:10, pointerEvents:'none' }} />
                <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🏆</div>
                <div style={{ fontWeight:900, fontSize:'1.1rem' }}>Certificate of Completion</div>
                <div style={{ opacity:0.85, fontSize:'0.85rem', marginTop:'0.3rem' }}>SkillSphere</div>
              </div>
              <div style={{ padding:'1.25rem' }}>
                <h3 style={{ fontWeight:800, color:'var(--text)', fontSize:'1rem', marginBottom:'0.4rem' }}>{cert.course?.title}</h3>
                <div style={{ fontSize:'0.8rem', color:'var(--text2)', marginBottom:'0.75rem' }}>
                  Instructor: {cert.mentor?.name} · {new Date(cert.issuedAt).toLocaleDateString()}
                </div>
                <div style={{ fontSize:'0.72rem', color:'var(--text2)', background:'var(--bg3)', padding:'0.4rem 0.7rem', borderRadius:6, marginBottom:'1rem', fontFamily:'monospace' }}>
                  ID: {cert.certificateId}
                </div>
                <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                  <button onClick={() => handlePrint(cert)}
                    style={{ flex:1, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', border:'none', padding:'0.55rem', borderRadius:8, fontWeight:700, cursor:'pointer', fontSize:'0.82rem' }}>
                    📄 Download
                  </button>
                  <Link to={`/certificates/verify/${cert.certificateId}`}
                    style={{ flex:1, background:'var(--bg3)', color:'var(--text)', padding:'0.55rem', borderRadius:8, fontWeight:600, fontSize:'0.82rem', textAlign:'center' }}>
                    🔍 Verify
                  </Link>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin + '/certificates/verify/' + cert.certificateId)}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ flex:1, background:'#0077b5', color:'#fff', padding:'0.55rem', borderRadius:8, fontWeight:600, fontSize:'0.82rem', textAlign:'center' }}>
                    in Share
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CertificatePage;
