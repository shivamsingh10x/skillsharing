import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosConfig';
import Loader from '../components/common/Loader';
import { CATEGORY_DEFAULTS } from '../api/courseService';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/wishlist')
      .then(r => setWishlist(r.data.wishlist || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const remove = async (courseId) => {
    try {
      await axiosInstance.post(`/wishlist/${courseId}`);
      setWishlist(prev => prev.filter(c => (c._id || c.id) !== courseId));
    } catch {}
  };

  if (loading) return <Loader fullPage />;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
      <div>
        <h1 style={{ fontSize:'1.75rem', fontWeight:900, color:'var(--text)' }}>❤️ My Wishlist</h1>
        <p style={{ color:'var(--text2)', marginTop:'0.3rem' }}>Courses you've saved for later</p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ background:'var(--bg2)', border:'2px dashed var(--border)', borderRadius:16, padding:'4rem', textAlign:'center' }}>
          <div style={{ fontSize:'3rem', marginBottom:'1rem' }}>💔</div>
          <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:'0.5rem' }}>Your wishlist is empty</h3>
          <p style={{ color:'var(--text2)', marginBottom:'1.5rem' }}>Browse courses and click the heart icon to save them here.</p>
          <Link to="/courses" style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.7rem 1.75rem', borderRadius:10, fontWeight:700 }}>
            Browse Courses
          </Link>
        </div>
      ) : (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:'1.5rem' }}>
          {wishlist.map(course => {
            const id = course._id || course.id;
            const cat = CATEGORY_DEFAULTS?.[course.category] || {};
            const thumb = course.thumbnail || cat.thumb;
            const emoji = cat.emoji || '📚';
            return (
              <div key={id} className="card-hover"
                style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', boxShadow:'var(--shadow)' }}>
                <div style={{ height:150, background: thumb ? 'none' : 'linear-gradient(135deg,#ede9fe,#ddd6fe)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem', position:'relative', overflow:'hidden' }}>
                  {thumb ? <img src={thumb} alt={course.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : emoji}
                  <button onClick={() => remove(id)}
                    style={{ position:'absolute', top:8, right:8, width:32, height:32, borderRadius:'50%', background:'rgba(0,0,0,0.5)', border:'none', color:'#ef4444', fontSize:'1rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}
                    title="Remove from wishlist">
                    ❤️
                  </button>
                </div>
                <div style={{ padding:'1rem' }}>
                  <div style={{ fontSize:'0.72rem', color:'var(--primary)', fontWeight:700, marginBottom:'0.25rem' }}>{course.category}</div>
                  <h3 style={{ fontWeight:700, color:'var(--text)', fontSize:'0.9rem', marginBottom:'0.3rem', lineHeight:1.3 }}>{course.title}</h3>
                  <div style={{ fontSize:'0.78rem', color:'var(--text2)', marginBottom:'0.75rem' }}>by {course.mentor?.name}</div>
                  <Link to={`/courses/${id}`}
                    style={{ display:'block', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', padding:'0.5rem', borderRadius:8, textAlign:'center', fontWeight:700, fontSize:'0.82rem' }}>
                    View Course →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default WishlistPage;
