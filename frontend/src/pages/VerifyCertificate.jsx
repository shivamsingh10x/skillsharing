import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';

const VerifyCertificate = () => {
  const { certId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosInstance.get(`/certificates/verify/${certId}`)
      .then(r => setCert(r.data.certificate))
      .catch(() => setError('Certificate not found or invalid.'))
      .finally(() => setLoading(false));
  }, [certId]);

  if (loading) return (
    <div style={{ textAlign:'center', padding:'4rem' }}>
      <div style={{ width:40, height:40, border:'4px solid var(--border)', borderTopColor:'var(--primary)', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto' }} />
    </div>
  );

  return (
    <div style={{ maxWidth:640, margin:'0 auto', padding:'2rem 1rem' }}>
      {error ? (
        <div style={{ background:'#fef2f2', border:'1px solid #fecaca', borderRadius:16, padding:'3rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>❌</div>
          <h2 style={{ fontWeight:800, color:'#dc2626', marginBottom:'0.5rem' }}>Invalid Certificate</h2>
          <p style={{ color:'#6b7280' }}>{error}</p>
          <Link to="/" style={{ display:'inline-block', marginTop:'1.5rem', color:'var(--primary)', fontWeight:600 }}>← Back to Home</Link>
        </div>
      ) : cert && (
        <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', boxShadow:'var(--shadow-lg)' }}>
          {/* Header */}
          <div style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', padding:'2.5rem', textAlign:'center', color:'#fff', position:'relative' }}>
            <div style={{ position:'absolute', inset:10, border:'2px solid rgba(255,255,255,0.25)', borderRadius:14, pointerEvents:'none' }} />
            <div style={{ fontSize:'3rem', marginBottom:'0.75rem' }}>✅</div>
            <h1 style={{ fontWeight:900, fontSize:'1.5rem' }}>Certificate Verified</h1>
            <p style={{ opacity:0.85, marginTop:'0.4rem', fontSize:'0.9rem' }}>This certificate is authentic and issued by SkillSphere</p>
          </div>

          <div style={{ padding:'2rem', display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            {[
              ['👤 Student', cert.student?.name],
              ['📚 Course', cert.course?.title],
              ['🏷️ Category', cert.course?.category],
              ['🎓 Instructor', cert.mentor?.name],
              ['📅 Issued On', new Date(cert.issuedAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })],
              ['🔑 Certificate ID', cert.certificateId],
            ].map(([label, value]) => (
              <div key={label} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.75rem 1rem', background:'var(--bg3)', borderRadius:10 }}>
                <span style={{ fontSize:'0.875rem', color:'var(--text2)', fontWeight:600 }}>{label}</span>
                <span style={{ fontSize:'0.875rem', color:'var(--text)', fontWeight:700, textAlign:'right', maxWidth:'60%' }}>{value}</span>
              </div>
            ))}

            <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'1rem', textAlign:'center' }}>
              <div style={{ color:'#16a34a', fontWeight:700, fontSize:'0.9rem' }}>✅ This certificate is valid and authentic</div>
            </div>

            <Link to="/courses" style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.75rem', borderRadius:10, textAlign:'center', fontWeight:700 }}>
              Explore More Courses
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default VerifyCertificate;
