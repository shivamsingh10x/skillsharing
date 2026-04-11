import { useState, useEffect, useCallback } from 'react';
import useCourses from '../../hooks/useCourses';

const CoursePlayer = ({ course }) => {
  const { enrolledCourses, completeLesson, fetchProgress } = useCourses();

  // Get the enrolled course entry (has progress attached)
  const enrolled = enrolledCourses.find(c => c.id === course?.id || c.id === course?._id);
  const savedCompleted = enrolled?.progress?.completedLessons || [];

  const [active, setActive] = useState(course?.lessons?.[0] || null);
  const [completed, setCompleted] = useState(savedCompleted.map(String));
  const [saving, setSaving] = useState(false);

  // Sync completed lessons from DB whenever enrolled course updates
  useEffect(() => {
    if (enrolled?.progress?.completedLessons) {
      setCompleted(enrolled.progress.completedLessons.map(String));
    }
  }, [enrolled]);

  // On mount, fetch fresh progress from DB
  useEffect(() => {
    if (course?.id || course?._id) {
      const courseId = course.id || course._id;
      fetchProgress(courseId).then(prog => {
        if (prog?.completedLessons) setCompleted(prog.completedLessons.map(String));
      }).catch(() => {});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course?.id]);

  const handleMarkComplete = useCallback(async (lesson) => {
    const lessonId = lesson._id || lesson.id;
    const alreadyDone = completed.includes(String(lessonId));
    if (alreadyDone || saving) return;

    setSaving(true);
    try {
      const courseId = course.id || course._id;
      const prog = await completeLesson(courseId, lessonId);
      if (prog?.completedLessons) setCompleted(prog.completedLessons.map(String));
    } catch (err) {
      console.error('Failed to save progress:', err);
    } finally {
      setSaving(false);
    }
  }, [completed, saving, course, completeLesson]);

  const lessons = course?.lessons || [];
  const totalLessons = lessons.length;
  const doneCount = completed.length;
  const progress = totalLessons ? Math.round((doneCount / totalLessons) * 100) : 0;
  const isCourseDone = enrolled?.progress?.completedAt;

  const activeId = String(active?._id || active?.id || '');
  const isDone = (l) => completed.includes(String(l._id || l.id));

  return (
    <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>

      {/* Video area */}
      <div style={{ flex:1, minWidth:280 }}>
        {/* Video player */}
        <div style={{ background:'#1f2937', borderRadius:12, height:360, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#9ca3af', gap:'0.5rem', position:'relative', overflow:'hidden' }}>
          {active?.videoUrl ? (
            <iframe
              key={active._id || active.id}
              src={`${active.videoUrl}?autoplay=1&rel=0&modestbranding=1`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width:'100%', height:'100%', border:'none', borderRadius:12 }}
            />
          ) : (
            <>
              <span style={{ fontSize:'4rem' }}>▶</span>
              <p style={{ color:'#fff', fontSize:'1.1rem', fontWeight:600, textAlign:'center', padding:'0 1rem' }}>
                {active?.title || 'Select a lesson'}
              </p>
              <small style={{ color:'#6b7280', fontSize:'0.8rem' }}>No video available for this lesson</small>
            </>
          )}
          {isCourseDone && !active?.videoUrl && (
            <div style={{ position:'absolute', top:12, right:12, background:'#10b981', color:'#fff', padding:'0.3rem 0.8rem', borderRadius:20, fontSize:'0.78rem', fontWeight:700 }}>
              🏆 Course Completed!
            </div>
          )}
          {isCourseDone && active?.videoUrl && (
            <div style={{ position:'absolute', top:8, right:8, background:'#10b981', color:'#fff', padding:'0.3rem 0.8rem', borderRadius:20, fontSize:'0.78rem', fontWeight:700, zIndex:10 }}>
              🏆 Completed!
            </div>
          )}
        </div>

        {active && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 0', flexWrap:'wrap', gap:'0.75rem' }}>
            <div>
              <h2 style={{ fontWeight:700, color:'#111827', margin:0 }}>{active.title}</h2>
              {active.description && <p style={{ color:'#6b7280', fontSize:'0.875rem', marginTop:'0.25rem' }}>{active.description}</p>}
            </div>
            <button
              onClick={() => handleMarkComplete(active)}
              disabled={isDone(active) || saving}
              style={{
                padding:'0.55rem 1.25rem', borderRadius:8,
                border: isDone(active) ? 'none' : '2px solid #6366f1',
                background: isDone(active) ? '#10b981' : saving ? '#e5e7eb' : '#fff',
                color: isDone(active) ? '#fff' : saving ? '#9ca3af' : '#6366f1',
                fontWeight:700, cursor: isDone(active) || saving ? 'not-allowed' : 'pointer',
                fontSize:'0.875rem', transition:'all 0.2s',
              }}>
              {isDone(active) ? '✅ Completed' : saving ? '⏳ Saving...' : 'Mark as Complete'}
            </button>
          </div>
        )}

        {/* Navigation buttons */}
        {lessons.length > 1 && (
          <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
            {(() => {
              const idx = lessons.findIndex(l => String(l._id || l.id) === activeId);
              return <>
                <button
                  disabled={idx <= 0}
                  onClick={() => setActive(lessons[idx - 1])}
                  style={{ flex:1, padding:'0.55rem', borderRadius:8, border:'1.5px solid #e5e7eb', background:'#fff', color: idx <= 0 ? '#d1d5db' : '#374151', cursor: idx <= 0 ? 'not-allowed' : 'pointer', fontWeight:600, fontSize:'0.875rem' }}>
                  ← Previous
                </button>
                <button
                  disabled={idx >= lessons.length - 1}
                  onClick={() => setActive(lessons[idx + 1])}
                  style={{ flex:1, padding:'0.55rem', borderRadius:8, border:'1.5px solid #e5e7eb', background:'#fff', color: idx >= lessons.length - 1 ? '#d1d5db' : '#374151', cursor: idx >= lessons.length - 1 ? 'not-allowed' : 'pointer', fontWeight:600, fontSize:'0.875rem' }}>
                  Next →
                </button>
              </>;
            })()}
          </div>
        )}
      </div>

      {/* Lesson sidebar */}
      <aside style={{ width:280, flexShrink:0, background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:'1rem', alignSelf:'flex-start' }}>
        {/* Progress bar */}
        <div style={{ marginBottom:'1rem' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'#6b7280', marginBottom:'0.3rem' }}>
            <span>Progress</span>
            <span style={{ fontWeight:700, color: progress === 100 ? '#10b981' : '#6366f1' }}>{progress}%</span>
          </div>
          <div style={{ background:'#e5e7eb', borderRadius:4, height:8 }}>
            <div style={{ background: progress === 100 ? '#10b981' : '#6366f1', height:8, borderRadius:4, width:`${progress}%`, transition:'width 0.4s ease' }} />
          </div>
          <div style={{ fontSize:'0.75rem', color:'#9ca3af', marginTop:'0.3rem' }}>{doneCount} / {totalLessons} lessons</div>
        </div>

        <h3 style={{ fontWeight:700, marginBottom:'0.75rem', fontSize:'0.9rem', color:'#111827' }}>Course Lessons</h3>

        {lessons.map((l, i) => {
          const lId = String(l._id || l.id);
          const done = completed.includes(lId);
          const isActive = lId === activeId;
          return (
            <button key={lId} onClick={() => setActive(l)}
              style={{
                display:'flex', alignItems:'center', gap:'0.5rem',
                padding:'0.55rem 0.75rem', borderRadius:8, border:'none',
                background: isActive ? '#ede9fe' : 'none',
                cursor:'pointer', width:'100%', textAlign:'left', marginBottom:'0.25rem',
                transition:'background 0.15s',
              }}>
              {/* Lesson number / checkmark */}
              <span style={{
                width:24, height:24, borderRadius:'50%', flexShrink:0,
                background: done ? '#10b981' : isActive ? '#6366f1' : '#e5e7eb',
                color: done || isActive ? '#fff' : '#6b7280',
                fontSize:'0.7rem', fontWeight:700,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                {done ? '✓' : i + 1}
              </span>
              <span style={{ flex:1, fontSize:'0.82rem', color: done ? '#9ca3af' : '#374151', textDecoration: done ? 'line-through' : 'none', lineHeight:1.3 }}>
                {l.title}
              </span>
              <span style={{ fontSize:'0.72rem', color:'#9ca3af', flexShrink:0 }}>{l.duration}</span>
            </button>
          );
        })}

        {isCourseDone && (
          <div style={{ marginTop:'1rem', background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:8, padding:'0.75rem', textAlign:'center' }}>
            <div style={{ fontSize:'1.5rem' }}>🏆</div>
            <div style={{ fontWeight:700, color:'#16a34a', fontSize:'0.85rem' }}>Course Complete!</div>
            <div style={{ fontSize:'0.75rem', color:'#6b7280', marginTop:'0.2rem' }}>Certificate earned</div>
          </div>
        )}
      </aside>
    </div>
  );
};
export default CoursePlayer;
