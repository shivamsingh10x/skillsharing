import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCourses from '../../hooks/useCourses';
import Loader from '../common/Loader';
import axiosInstance from '../../api/axiosConfig';
import { ChartCard, AnalyticsCard } from '../analytics/ChartCard';
import LineChart from '../analytics/LineChart';
import BarChart from '../analytics/BarChart';
import DonutChart from '../analytics/DonutChart';
import DataTable from '../analytics/DataTable';
import FilterBar from '../analytics/FilterBar';

const ProgressBar = ({ pct, completedAt }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text2)', marginBottom: '0.2rem' }}>
      <span>{completedAt ? '🏆 Completed' : `${pct}%`}</span>
    </div>
    <div style={{ background: 'var(--bg3)', borderRadius: 4, height: 5 }}>
      <div style={{ background: completedAt ? '#10b981' : '#6366f1', height: 5, borderRadius: 4, width: `${pct}%`, transition: 'width 0.4s' }} />
    </div>
  </div>
);

const StudentDashboard = () => {
  const { user } = useAuth();
  const { enrolledCourses, fetchEnrolledCourses, loading } = useCourses();
  const [analytics, setAnalytics] = useState(null);
  const [range, setRange] = useState('7d');
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [tab, setTab] = useState('overview'); // overview | courses | activity

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const { data } = await axiosInstance.get(`/analytics/student?range=${range}`);
      setAnalytics(data);
    } catch { /* silent */ }
    finally { setAnalyticsLoading(false); }
  }, [range]);

  useEffect(() => { fetchEnrolledCourses(); }, [fetchEnrolledCourses]);
  useEffect(() => { fetchAnalytics(); }, [fetchAnalytics]);

  const stats = analytics?.stats || {};
  const upcomingClasses = enrolledCourses
    .filter(c => c.upcomingClass)
    .map(c => ({ ...c.upcomingClass, courseId: c.id, courseTitle: c.title }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const courseTableCols = [
    { key: 'title', label: 'Course' },
    { key: 'category', label: 'Category', render: v => <span style={{ background: '#ede9fe', color: '#6366f1', padding: '0.15rem 0.5rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }}>{v}</span> },
    { key: 'progressPct', label: 'Progress', render: (v, row) => (
      <div style={{ minWidth: 120 }}>
        <ProgressBar pct={v} completedAt={row.completedAt} />
      </div>
    )},
    { key: 'completedLessons', label: 'Lessons Done', render: (v, row) => `${v}/${row.totalLessons}` },
    { key: 'status', label: 'Status', render: v => {
      const colors = { Completed: ['#f0fdf4','#16a34a'], 'In Progress': ['#ede9fe','#6366f1'], 'Not Started': ['var(--bg3)','var(--text2)'] };
      const [bg, color] = colors[v] || ['var(--bg3)','var(--text2)'];
      return <span style={{ background: bg, color, padding: '0.2rem 0.6rem', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700 }}>{v}</span>;
    }},
    { key: 'id', label: '', sortable: false, render: (v) => (
      <Link to={`/courses/${v}`} style={{ color: '#6366f1', fontWeight: 600, fontSize: '0.8rem' }}>View →</Link>
    )},
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Welcome banner */}
      <div style={{ background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)', color: '#fff', borderRadius: 16, padding: '1.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 900 }}>Welcome back, {user?.name} 👋</h1>
          <p style={{ opacity: 0.85, marginTop: '0.3rem', fontSize: '0.9rem' }}>
            {stats.enrolled > 0 ? `${stats.enrolled} enrolled · ${stats.completed} completed · ${stats.certificates} certificates` : 'Start your learning journey today.'}
          </p>
        </div>
        <Link to="/courses" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.55rem 1.25rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.4)', fontSize: '0.875rem' }}>
          Browse Courses →
        </Link>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.25rem', borderBottom: `1px solid var(--border)`, paddingBottom: 0 }}>
        {[['overview','📊 Overview'],['courses','📚 My Courses'],['activity','📅 Schedule']].map(([t, l]) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: '0.6rem 1.1rem', border: 'none', background: 'none', fontWeight: tab === t ? 700 : 500, color: tab === t ? '#6366f1' : 'var(--text2)', cursor: 'pointer', borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent', fontSize: '0.875rem', transition: 'all 0.15s' }}>
            {l}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'overview' && (
        <>
          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
            <AnalyticsCard icon="📚" value={stats.enrolled || 0} label="Enrolled" color="#6366f1" />
            <AnalyticsCard icon="✅" value={stats.completed || 0} label="Completed" color="#10b981" />
            <AnalyticsCard icon="▶" value={stats.inProgress || 0} label="In Progress" color="#f59e0b" />
            <AnalyticsCard icon="🏆" value={stats.certificates || 0} label="Certificates" color="#8b5cf6" />
            <AnalyticsCard icon="📖" value={stats.totalLessonsCompleted || 0} label="Lessons Done" color="#06b6d4" />
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>Learning Activity</h2>
            <FilterBar value={range} onChange={setRange} />
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.25rem' }}>
            <ChartCard title="Lessons Completed Over Time" subtitle={`Last ${range === '7d' ? '7 days' : range === '30d' ? '30 days' : range}`}>
              {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                <LineChart data={analytics?.activityData || []} color="#6366f1" height={180} />
              )}
            </ChartCard>

            <ChartCard title="Course Status Breakdown">
              {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                <DonutChart segments={analytics?.completionData || []} size={140} />
              )}
            </ChartCard>
          </div>

          {/* Progress by course bar chart */}
          {analytics?.enrolledCourses?.length > 0 && (
            <ChartCard title="Progress by Course" subtitle="Completion % per enrolled course">
              {analyticsLoading ? <div className="skeleton" style={{ height: 200 }} /> : (
                <BarChart
                  data={analytics.enrolledCourses.slice(0, 8).map(c => ({
                    label: c.title?.split(' ').slice(0, 2).join(' ') || 'Course',
                    value: c.progressPct,
                    color: c.completedAt ? '#10b981' : '#6366f1',
                  }))}
                  height={200}
                  unit="%"
                />
              )}
            </ChartCard>
          )}
        </>
      )}

      {/* ── COURSES TAB ── */}
      {tab === 'courses' && (
        <ChartCard title="Enrolled Courses" subtitle="All your courses with progress tracking">
          {loading ? <Loader /> : (
            <DataTable
              columns={courseTableCols}
              rows={analytics?.enrolledCourses || []}
              emptyMsg="No courses enrolled yet."
            />
          )}
        </ChartCard>
      )}

      {/* ── SCHEDULE TAB ── */}
      {tab === 'activity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {upcomingClasses.length === 0 ? (
            <div style={{ background: 'var(--bg2)', border: '2px dashed var(--border)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📅</div>
              <p style={{ color: 'var(--text2)' }}>No upcoming live classes scheduled.</p>
            </div>
          ) : upcomingClasses.map((uc, i) => (
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
              <a href={uc.link} target="_blank" rel="noopener noreferrer"
                style={{ marginLeft: 'auto', background: '#6366f1', color: '#fff', padding: '0.45rem 1.1rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, fontSize: '0.82rem' }}>
                🔗 Join
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default StudentDashboard;
