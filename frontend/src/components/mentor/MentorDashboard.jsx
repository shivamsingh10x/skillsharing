import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useCourses from '../../hooks/useCourses';
import { deleteCourse } from '../../api/courseService';
import Loader from '../common/Loader';
import axiosInstance from '../../api/axiosConfig';
import { ChartCard, AnalyticsCard } from '../analytics/ChartCard';
import LineChart from '../analytics/LineChart';
import BarChart from '../analytics/BarChart';
import DonutChart from '../analytics/DonutChart';
import DataTable from '../analytics/DataTable';
import FilterBar from '../analytics/FilterBar';

const MentorDashboard = () => {
  const { mentorCourses, fetchMentorCourses, loading } = useCourses();
  const [analytics, setAnalytics] = useState(null);
  const [range, setRange] = useState('30d');
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/analytics/mentor?range=${range}`);
      setAnalytics(data);
    } catch { /* silent */ }
    finally { setAnalyticsLoading(false); }
  }, [range]);

  useEffect(() => { fetchMentorCourses(); }, [fetchMentorCourses]);
  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const stats = analytics?.stats || {};

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;
    await deleteCourse(id);
    fetchMentorCourses();
    fetchAnalytics();
  };

  // CSV export
  const exportCSV = (data, filename) => {
    if (!data || !data.length) return;
    const keys = Object.keys(data[0]);
    const escape = (v) => '"' + String(v === null || v === undefined ? '' : v) + '"';
    const csv = [keys.join(','), ...data.map(row => keys.map(k => escape(row[k])).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  const upcomingClasses = mentorCourses
    .filter(c => c.upcomingClass)
    .map(c => ({ ...c.upcomingClass, courseId: c.id, courseTitle: c.title }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const courseTableCols = [
    { key: 'title', label: 'Course' },
    { key: 'category', label: 'Category', render: v => <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.15rem 0.5rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }}>{v}</span> },
    { key: 'totalStudents', label: 'Students', render: v => <strong>{v}</strong> },
    { key: 'completionRate', label: 'Completion', render: v => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 100 }}>
        <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: 4, height: 6 }}>
          <div style={{ background: '#10b981', height: 6, borderRadius: 4, width: `${v}%` }} />
        </div>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)' }}>{v}%</span>
      </div>
    )},
    { key: 'rating', label: 'Rating', render: v => v ? `⭐ ${v}` : 'New' },
    { key: 'lessons', label: 'Lessons' },
    { key: 'id', label: '', sortable: false, render: (v) => (
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        <Link to={`/mentor/edit-course/${v}`} style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.78rem' }}>Edit</Link>
        <span style={{ color: 'var(--border)' }}>·</span>
        <Link to={`/courses/${v}`} style={{ color: 'var(--text2)', fontWeight: 600, fontSize: '0.78rem' }}>View</Link>
      </div>
    )},
  ];

  const studentTableCols = [
    { key: 'name', label: 'Student' },
    { key: 'email', label: 'Email' },
    { key: 'enrolledCourses', label: 'Courses', render: v => v?.length || 0 },
    { key: 'lastActive', label: 'Last Active', render: v => v ? new Date(v).toLocaleDateString() : '—' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a5f 100%)', color: '#fff', borderRadius: 16, padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Mentor Dashboard 🎓</h1>
          <p style={{ opacity: 0.75, marginTop: '0.3rem', fontSize: '0.9rem' }}>
            {stats.totalCourses} courses · {stats.totalStudents} students · ⭐ {stats.avgRating} avg rating
          </p>
        </div>
        <Link to="/mentor/create-course" style={{ background: '#6366f1', color: '#fff', padding: '0.6rem 1.4rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, boxShadow: '0 4px 14px rgba(99,102,241,0.4)', fontSize: '0.875rem' }}>
          + Create Course
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: `1px solid var(--border)` }}>
        {[['overview','📊 Overview'],['courses','📚 Courses'],['students','👥 Students'],['schedule','📅 Schedule']].map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '0.6rem 1.1rem', border: 'none', background: 'none', fontWeight: tab === t ? 700 : 500, color: tab === t ? '#6366f1' : 'var(--text2)', cursor: 'pointer', borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent', fontSize: '0.875rem', transition: 'all 0.15s' }}>
            {l}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: '1rem' }}>
            <AnalyticsCard icon="📚" value={stats.totalCourses || 0} label="Total Courses" color="#6366f1" />
            <AnalyticsCard icon="👥" value={stats.totalStudents || 0} label="Total Students" color="#10b981" />
            <AnalyticsCard icon="📋" value={stats.totalEnrollments || 0} label="Enrollments" color="#f59e0b" />
            <AnalyticsCard icon="⭐" value={stats.avgRating || '—'} label="Avg Rating" color="#8b5cf6" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>Student Growth</h2>
            <FilterBar value={range} onChange={setRange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.25rem' }}>
            <ChartCard title="New Enrollments Over Time" subtitle={`Last ${range}`}>
              {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                <LineChart data={analytics?.growthData || []} color="#10b981" height={180} />
              )}
            </ChartCard>

            <ChartCard title="Enrollments by Category">
              {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                <DonutChart
                  segments={(analytics?.enrollmentByCategory || []).map((c, i) => ({
                    ...c,
                    color: ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#ec4899','#84cc16'][i % 8],
                  }))}
                  size={140}
                />
              )}
            </ChartCard>
          </div>

          {/* Students per course bar */}
          {analytics?.courseStats?.length > 0 && (
            <ChartCard title="Students per Course">
              {analyticsLoading ? <div className="skeleton" style={{ height: 200 }} /> : (
                <BarChart
                  data={analytics.courseStats.slice(0, 8).map((c, i) => ({
                    label: c.title?.split(' ').slice(0, 2).join(' ') || 'Course',
                    value: c.totalStudents,
                    color: ['#6366f1','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ef4444','#ec4899','#84cc16'][i % 8],
                  }))}
                  height={200}
                />
              )}
            </ChartCard>
          )}
        </>
      )}

      {/* ── COURSES TAB ── */}
      {tab === 'courses' && (
        <ChartCard
          title="Course Performance"
          subtitle="All your courses with analytics"
          action={
            <button onClick={() => exportCSV(analytics?.courseStats, 'courses.csv')}
              style={{ background: 'var(--bg3)', border: 'none', color: 'var(--text2)', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              ⬇ Export CSV
            </button>
          }>
          {loading ? <Loader /> : (
            <DataTable
              columns={courseTableCols}
              rows={(analytics?.courseStats || []).map(c => ({ ...c, id: c.id }))}
              emptyMsg="No courses yet."
            />
          )}
        </ChartCard>
      )}

      {/* ── STUDENTS TAB ── */}
      {tab === 'students' && (
        <ChartCard
          title="Student List"
          subtitle={`${stats.totalStudents || 0} students across all courses`}
          action={
            <button onClick={() => exportCSV(analytics?.students, 'students.csv')}
              style={{ background: 'var(--bg3)', border: 'none', color: 'var(--text2)', padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
              ⬇ Export CSV
            </button>
          }>
          {analyticsLoading ? <Loader /> : (
            <DataTable
              columns={studentTableCols}
              rows={analytics?.students || []}
              emptyMsg="No students yet."
            />
          )}
        </ChartCard>
      )}

      {/* ── SCHEDULE TAB ── */}
      {tab === 'schedule' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>Upcoming Live Classes</h2>
            <Link to="/mentor/create-course" style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.875rem' }}>+ Schedule New</Link>
          </div>

          {loading ? <Loader /> : mentorCourses.length === 0 ? (
            <div style={{ background: 'var(--bg2)', border: '2px dashed var(--border)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🎬</div>
              <p style={{ color: 'var(--text2)', marginBottom: '1rem' }}>No courses yet. Create your first course.</p>
              <Link to="/mentor/create-course" style={{ background: '#6366f1', color: '#fff', padding: '0.65rem 1.5rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700 }}>Create Course</Link>
            </div>
          ) : (
            <>
              {upcomingClasses.length === 0 && (
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', textAlign: 'center', color: 'var(--text2)', fontSize: '0.875rem' }}>
                  No upcoming classes. Edit a course to schedule one.
                </div>
              )}
              {upcomingClasses.map((uc, i) => (
                <div key={i} style={{ background: 'linear-gradient(135deg,#0f172a,#1e3a5f)', borderRadius: 12, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', color: '#fff' }}>
                  <div style={{ flex: 1, minWidth: 160 }}>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Course</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{uc.courseTitle}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
                    <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Date</div><div style={{ fontWeight: 600 }}>{uc.date}</div></div>
                    <div><div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Time</div><div style={{ fontWeight: 600 }}>{uc.time}</div></div>
                    <div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Platform</div>
                      <span style={{ background: uc.platform === 'Zoom' ? '#2563eb' : '#16a34a', padding: '0.15rem 0.5rem', borderRadius: 6, fontSize: '0.75rem', fontWeight: 700 }}>{uc.platform}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                    <a href={uc.link} target="_blank" rel="noopener noreferrer"
                      style={{ background: '#6366f1', color: '#fff', padding: '0.4rem 0.9rem', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>
                      🔗 Join
                    </a>
                    <Link to={`/mentor/edit-course/${uc.courseId}`}
                      style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '0.4rem 0.9rem', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.82rem' }}>
                      ✏️ Edit
                    </Link>
                  </div>
                </div>
              ))}

              {/* All courses quick list */}
              <ChartCard title="All My Courses">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {mentorCourses.map(c => (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'var(--bg3)', borderRadius: 10, flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: 140 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{c.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text2)' }}>{c.category} · {c.studentsCount || 0} students</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <Link to={`/mentor/edit-course/${c.id}`} style={{ padding: '0.35rem 0.75rem', borderRadius: 6, background: '#ede9fe', color: '#6366f1', textDecoration: 'none', fontWeight: 600, fontSize: '0.78rem' }}>Edit</Link>
                        <button onClick={() => handleDelete(c.id)} style={{ padding: '0.35rem 0.75rem', borderRadius: 6, background: '#fef2f2', color: '#ef4444', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.78rem' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default MentorDashboard;
