import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseDetails } from '../api/courseService';
import { getCourseReviews, createReview } from '../api/reviewService';
import useCourses from '../hooks/useCourses';
import useAuth from '../hooks/useAuth';
import CoursePlayer from '../components/student/CoursePlayer';
import Loader from '../components/common/Loader';
import axiosInstance from '../api/axiosConfig';

const StarRating = ({ value, onChange, readonly = false }) => (
  <div style={{ display:'flex', gap:'0.2rem' }}>
    {[1,2,3,4,5].map(n => (
      <button key={n} type="button" onClick={() => !readonly && onChange && onChange(n)}
        style={{ background:'none', border:'none', cursor: readonly ? 'default' : 'pointer', fontSize:'1.3rem', color: n <= value ? '#f59e0b' : 'var(--border)', transition:'color 0.15s', padding:'0 1px' }}>
        ★
      </button>
    ))}
  </div>
);

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isStudent, isMentor } = useAuth();
  const { enrolledCourses, enroll, fetchEnrolledCourses } = useCourses();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewMsg, setReviewMsg] = useState('');
  const [wishlisted, setWishlisted] = useState(false);
  const [certClaiming, setCertClaiming] = useState(false);
  const [certMsg, setCertMsg] = useState('');

  useEffect(() => {
    getCourseDetails(id)
      .then(({ data }) => { setCourse(data); setLoading(false); })
      .catch(() => navigate('/courses'));
  }, [id, navigate]);

  useEffect(() => {
    if (isStudent) fetchEnrolledCourses();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isStudent]);

  const loadReviews = useCallback(() => {
    getCourseReviews(id).then(r => { setReviews(r.reviews || []); setAvgRating(r.avgRating || 0); }).catch(() => {});
  }, [id]);

  useEffect(() => { loadReviews(); }, [loadReviews]);

  const isEnrolled = enrolledCourses.some(c => c.id === id);
  const isOwnCourse = isMentor && course?.mentor?.id === user?.id;
  const enrolledCourse = enrolledCourses.find(c => c.id === id);
  const isCourseComplete = !!enrolledCourse?.progress?.completedAt;
  const hasReviewed = reviews.some(r => r.student?._id === user?._id || r.student?.id === user?.id);

  // Auto-enroll student on page load
  useEffect(() => {
    if (isStudent && course && !isEnrolled && !enrolling) {
      setEnrolling(true);
      enroll(id).then(() => setEnrolling(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudent, course]);

  const handleToggleWishlist = async () => {
    if (!user) return navigate('/login');
    try {
      const r = await axiosInstance.post(`/wishlist/${id}`);
      setWishlisted(r.data.wishlisted);
    } catch {}
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewForm.rating) return;
    setSubmittingReview(true);
    try {
      await createReview(id, reviewForm);
      setReviewMsg('✅ Review submitted!');
      setReviewForm({ rating: 5, comment: '' });
      loadReviews();
    } catch (err) {
      setReviewMsg(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
      setTimeout(() => setReviewMsg(''), 3000);
    }
  };

  const handleClaimCertificate = async () => {
    setCertClaiming(true);
    try {
      const r = await axiosInstance.post(`/certificates/claim/${id}`);
      setCertMsg(`🏆 Certificate earned! ID: ${r.data.certificate.certificateId}`);
    } catch (err) {
      setCertMsg(err.response?.data?.message || 'Failed to claim certificate');
    } finally {
      setCertClaiming(false);
    }
  };

  if (loading) return <Loader fullPage />;
  if (!course) return null;

  const uc = course.upcomingClass;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2.5rem' }} className="fade-in">

      {/* Breadcrumb */}
      <div style={{ fontSize:'0.82rem', color:'var(--text2)', display:'flex', gap:'0.5rem', alignItems:'center', flexWrap:'wrap' }}>
        <Link to="/courses" style={{ color:'var(--primary)' }}>Courses</Link>
        <span>›</span><span>{course.category}</span><span>›</span>
        <span style={{ color:'var(--text)', fontWeight:500 }}>{course.title}</span>
      </div>

      {/* Header */}
      <div style={{ display:'flex', gap:'2rem', alignItems:'flex-start', flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:280 }}>
          <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'0.75rem' }}>
            <span style={{ background:'#ede9fe', color:'var(--primary)', fontSize:'0.75rem', fontWeight:700, padding:'0.2rem 0.7rem', borderRadius:20 }}>{course.category}</span>
            <span style={{ background:'var(--bg3)', color:'var(--text2)', fontSize:'0.75rem', fontWeight:600, padding:'0.2rem 0.7rem', borderRadius:20 }}>{course.level}</span>
            <span style={{ background:'#dcfce7', color:'#16a34a', fontSize:'0.75rem', fontWeight:800, padding:'0.2rem 0.7rem', borderRadius:20 }}>FREE</span>
          </div>
          <h1 style={{ fontSize:'clamp(1.4rem,3vw,2rem)', fontWeight:900, color:'var(--text)', lineHeight:1.25 }}>{course.title}</h1>
          <p style={{ color:'var(--text2)', marginTop:'0.75rem', lineHeight:1.7 }}>{course.description}</p>

          <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap', marginTop:'1.25rem', fontSize:'0.875rem', color:'var(--text3)' }}>
            <span style={{ display:'flex', alignItems:'center', gap:'0.3rem' }}>
              <StarRating value={Math.round(avgRating)} readonly />
              <strong>{avgRating || course.rating || 'New'}</strong>
              <span style={{ color:'var(--text2)' }}>({reviews.length} reviews)</span>
            </span>
            <span>👥 <strong>{course.studentsCount || 0}</strong> students</span>
            <span>⏱ <strong>{course.duration}</strong></span>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginTop:'1.25rem', padding:'0.75rem 1rem', background:'var(--bg3)', borderRadius:10, width:'fit-content' }}>
            <img src={course.mentor?.avatar} alt={course.mentor?.name} style={{ width:36, height:36, borderRadius:'50%', objectFit:'cover' }} />
            <div>
              <div style={{ fontSize:'0.72rem', color:'var(--text2)' }}>Created by</div>
              <div style={{ fontWeight:700, color:'var(--text)', fontSize:'0.9rem' }}>{course.mentor?.name}</div>
            </div>
          </div>
        </div>

        {/* Enroll card */}
        <div style={{ width:300, flexShrink:0, background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:16, overflow:'hidden', boxShadow:'var(--shadow-lg)', position:'sticky', top:80 }}>
          {course.thumbnail && <img src={course.thumbnail} alt={course.title} style={{ width:'100%', height:180, objectFit:'cover', display:'block' }} />}
          <div style={{ padding:'1.25rem' }}>
            <div style={{ fontSize:'1.6rem', fontWeight:900, color:'#10b981', marginBottom:'0.25rem' }}>FREE</div>
            <div style={{ fontSize:'0.75rem', color:'var(--text2)', marginBottom:'1rem' }}>No credit card required</div>

            {isStudent && (
              enrolling ? (
                <div style={{ background:'#ede9fe', color:'var(--primary)', padding:'0.75rem', borderRadius:10, textAlign:'center', fontWeight:700, marginBottom:'0.75rem' }}>⏳ Enrolling...</div>
              ) : isEnrolled ? (
                <div style={{ background:'#f0fdf4', color:'#16a34a', border:'1px solid #bbf7d0', padding:'0.75rem', borderRadius:10, textAlign:'center', fontWeight:700, marginBottom:'0.75rem' }}>✅ Enrolled!</div>
              ) : null
            )}

            {/* Wishlist button */}
            {isStudent && (
              <button onClick={handleToggleWishlist}
                style={{ width:'100%', background: wishlisted ? '#fef2f2' : 'var(--bg3)', color: wishlisted ? '#ef4444' : 'var(--text2)', border:`1px solid ${wishlisted ? '#fecaca' : 'var(--border)'}`, padding:'0.6rem', borderRadius:10, fontWeight:600, cursor:'pointer', marginBottom:'0.75rem', fontSize:'0.875rem', transition:'all 0.2s' }}>
                {wishlisted ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
              </button>
            )}

            {/* Certificate claim */}
            {isStudent && isCourseComplete && (
              <div style={{ marginBottom:'0.75rem' }}>
                <button onClick={handleClaimCertificate} disabled={certClaiming}
                  style={{ width:'100%', background:'linear-gradient(135deg,#f59e0b,#d97706)', color:'#fff', border:'none', padding:'0.7rem', borderRadius:10, fontWeight:700, cursor: certClaiming ? 'not-allowed' : 'pointer', fontSize:'0.875rem' }}>
                  {certClaiming ? '⏳ Claiming...' : '🏆 Claim Certificate'}
                </button>
                {certMsg && <div style={{ marginTop:'0.5rem', fontSize:'0.78rem', color: certMsg.startsWith('🏆') ? '#16a34a' : '#dc2626', fontWeight:600 }}>{certMsg}</div>}
              </div>
            )}

            {isOwnCourse && (
              <Link to={`/mentor/edit-course/${course.id}`}
                style={{ display:'block', width:'100%', background:'#ede9fe', color:'var(--primary)', padding:'0.75rem', borderRadius:10, textAlign:'center', fontWeight:700, textDecoration:'none', marginBottom:'0.75rem' }}>
                ✏️ Edit Course
              </Link>
            )}

            {!user && (
              <button onClick={() => navigate('/login')}
                style={{ width:'100%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', border:'none', padding:'0.85rem', borderRadius:10, fontSize:'1rem', fontWeight:700, cursor:'pointer', marginBottom:'0.75rem' }}>
                Log in to Enroll Free
              </button>
            )}

            <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem', fontSize:'0.8rem', color:'var(--text2)', marginTop:'0.5rem' }}>
              <span>✔ {course.lessons?.length || 0} lessons</span>
              <span>✔ {course.duration} of content</span>
              <span>✔ Certificate on completion</span>
              <span>✔ Lifetime access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming class */}
      {uc && (
        <section style={{ background:'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius:16, padding:'1.75rem 2rem', color:'#fff' }}>
          <h2 style={{ fontSize:'1.1rem', fontWeight:700, marginBottom:'1rem' }}>📅 Upcoming Live Class</h2>
          <div style={{ display:'flex', gap:'2rem', flexWrap:'wrap', alignItems:'center' }}>
            <div><div style={{ fontSize:'0.72rem', color:'#94a3b8' }}>Date</div><div style={{ fontWeight:700 }}>{uc.date}</div></div>
            <div><div style={{ fontSize:'0.72rem', color:'#94a3b8' }}>Time</div><div style={{ fontWeight:700 }}>{uc.time}</div></div>
            <div>
              <div style={{ fontSize:'0.72rem', color:'#94a3b8' }}>Platform</div>
              <span style={{ background: uc.platform === 'Zoom' ? '#2563eb' : '#16a34a', padding:'0.15rem 0.5rem', borderRadius:6, fontSize:'0.75rem', fontWeight:700 }}>{uc.platform}</span>
            </div>
            {isEnrolled && (
              <a href={uc.link} target="_blank" rel="noopener noreferrer"
                style={{ marginLeft:'auto', background:'var(--primary)', color:'#fff', padding:'0.65rem 1.5rem', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:'0.9rem' }}>
                🔗 Join Class
              </a>
            )}
          </div>
        </section>
      )}

      {/* Course player */}
      {isStudent && isEnrolled && (
        <section>
          <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--text)', marginBottom:'1rem' }}>🎬 Course Content</h2>
          <CoursePlayer course={course} />
        </section>
      )}

      {/* Curriculum preview */}
      {(!isStudent || !isEnrolled) && course.lessons?.length > 0 && (
        <section>
          <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--text)', marginBottom:'1rem' }}>📋 Curriculum</h2>
          <div style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
            {course.lessons.map((l, i) => (
              <div key={l.id || i} style={{ display:'flex', alignItems:'center', gap:'0.75rem', padding:'0.85rem 1.25rem', borderBottom: i < course.lessons.length - 1 ? `1px solid var(--border)` : 'none', fontSize:'0.875rem', color:'var(--text3)' }}>
                <span style={{ width:28, height:28, borderRadius:'50%', background:'var(--bg3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.75rem', fontWeight:700, flexShrink:0 }}>{i+1}</span>
                <span style={{ flex:1 }}>{l.title}</span>
                <span style={{ fontSize:'0.78rem', color:'var(--text2)' }}>{l.duration}</span>
                <span style={{ color:'var(--text2)' }}>🔒</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      <section>
        <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'var(--text)', marginBottom:'1.25rem' }}>
          ⭐ Reviews {reviews.length > 0 && <span style={{ fontSize:'0.9rem', color:'var(--text2)', fontWeight:500 }}>({reviews.length})</span>}
        </h2>

        {/* Write review */}
        {isStudent && isEnrolled && !hasReviewed && (
          <form onSubmit={handleSubmitReview} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:14, padding:'1.5rem', marginBottom:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
            <h3 style={{ fontWeight:700, color:'var(--text)', fontSize:'0.95rem' }}>Write a Review</h3>
            <div>
              <label style={{ fontSize:'0.82rem', fontWeight:600, color:'var(--text2)', display:'block', marginBottom:'0.4rem' }}>Your Rating</label>
              <StarRating value={reviewForm.rating} onChange={r => setReviewForm(f => ({ ...f, rating: r }))} />
            </div>
            <textarea
              style={{ width:'100%', padding:'0.7rem 1rem', border:`1.5px solid var(--border)`, borderRadius:8, fontSize:'0.875rem', outline:'none', resize:'vertical', minHeight:80, background:'var(--bg)', color:'var(--text)', fontFamily:'inherit' }}
              placeholder="Share your experience with this course..."
              value={reviewForm.comment}
              onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
            />
            {reviewMsg && <div style={{ fontSize:'0.82rem', fontWeight:600, color: reviewMsg.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{reviewMsg}</div>}
            <button type="submit" disabled={submittingReview}
              style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', border:'none', padding:'0.65rem 1.5rem', borderRadius:8, fontWeight:700, cursor: submittingReview ? 'not-allowed' : 'pointer', alignSelf:'flex-start' }}>
              {submittingReview ? 'Submitting...' : '⭐ Submit Review'}
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p style={{ color:'var(--text2)', fontSize:'0.875rem' }}>No reviews yet. Be the first!</p>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {reviews.map(r => (
              <div key={r._id} style={{ background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:12, padding:'1.25rem' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
                  <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(135deg,#6366f1,#8b5cf6)', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.9rem', flexShrink:0 }}>
                    {r.student?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'0.875rem', color:'var(--text)' }}>{r.student?.name}</div>
                    <StarRating value={r.rating} readonly />
                  </div>
                  <div style={{ marginLeft:'auto', fontSize:'0.75rem', color:'var(--text2)' }}>
                    {new Date(r.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {r.comment && <p style={{ fontSize:'0.875rem', color:'var(--text3)', lineHeight:1.6 }}>{r.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
export default CourseDetails;
