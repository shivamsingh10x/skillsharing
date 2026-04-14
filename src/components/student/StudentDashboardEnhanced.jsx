import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useCourses from '../../hooks/useCourses';
import Loader from '../common/Loader';
import { useTheme } from '../../context/ThemeContext';
import axiosInstance from '../../api/axiosConfig';
import { ChartCard, AnalyticsCard } from '../analytics/ChartCard';
import LineChart from '../analytics/LineChart';
import BarChart from '../analytics/BarChart';
import DonutChart from '../analytics/DonutChart';
import DataTable from '../analytics/DataTable';
import FilterBar from '../analytics/FilterBar';

// Animated counter component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = value / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <span>{count}</span>;
};

// Floating animation component
const FloatingCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(99,102,241,0.2)' }}
  >
    {children}
  </motion.div>
);

// Animated progress ring
const AnimatedProgressRing = ({ percentage, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--bg3)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#6366f1"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

const ProgressBar = ({ pct, completedAt }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text2)', marginBottom: '0.2rem' }}>
      <span>{completedAt ? '🏆 Completed' : `${pct}%`}</span>
    </div>
    <motion.div style={{ background: 'var(--bg3)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
      <motion.div
        style={{ background: completedAt ? '#10b981' : '#6366f1', height: 5, borderRadius: 4 }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </motion.div>
  </div>
);

const StudentDashboardEnhanced = () => {
  const { user } = useAuth();
  const { enrolledCourses, fetchEnrolledCourses, loading } = useCourses();
  const { dark: _dark } = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [range, setRange] = useState('7d');
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [tab, setTab] = useState('overview');

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

      {/* Enhanced Welcome Banner with Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)',
          color: '#fff',
          borderRadius: 16,
          padding: '1.75rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 200,
            height: 200,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            top: -50,
            right: -50,
          }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            width: 150,
            height: 150,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%',
            bottom: -30,
            left: -30,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ fontSize: '1.4rem', fontWeight: 900 }}
          >
            Welcome back, {user?.name} 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ opacity: 0.85, marginTop: '0.3rem', fontSize: '0.9rem' }}
          >
            {stats.enrolled > 0 ? (
              <>
                <AnimatedCounter value={stats.enrolled} /> enrolled · <AnimatedCounter value={stats.completed} /> completed · <AnimatedCounter value={stats.certificates} /> certificates
              </>
            ) : 'Start your learning journey today.'}
          </motion.p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/courses" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '0.55rem 1.25rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600, border: '1.5px solid rgba(255,255,255,0.4)', fontSize: '0.875rem', display: 'inline-block' }}>
            Browse Courses →
          </Link>
        </motion.div>
      </motion.div>

      {/* Animated Tabs */}
      <motion.div style={{ display: 'flex', gap: '0.25rem', borderBottom: `1px solid var(--border)`, paddingBottom: 0 }}>
        {[['overview','📊 Overview'],['courses','📚 My Courses'],['activity','📅 Schedule']].map(([t, l], idx) => (
          <motion.button
            key={t}
            onClick={() => setTab(t)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -2 }}
            style={{
              padding: '0.6rem 1.1rem',
              border: 'none',
              background: 'none',
              fontWeight: tab === t ? 700 : 500,
              color: tab === t ? '#6366f1' : 'var(--text2)',
              cursor: 'pointer',
              borderBottom: tab === t ? '2px solid #6366f1' : '2px solid transparent',
              fontSize: '0.875rem',
              transition: 'all 0.15s'
            }}
          >
            {l}
          </motion.button>
        ))}
      </motion.div>

      {/* ── OVERVIEW TAB ── */}
      {tab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
        >
          {/* Stat cards with staggered animation */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: '1rem' }}>
            {[
              { icon: '📚', value: stats.enrolled || 0, label: 'Enrolled', color: '#6366f1' },
              { icon: '✅', value: stats.completed || 0, label: 'Completed', color: '#10b981' },
              { icon: '▶', value: stats.inProgress || 0, label: 'In Progress', color: '#f59e0b' },
              { icon: '🏆', value: stats.certificates || 0, label: 'Certificates', color: '#8b5cf6' },
              { icon: '📖', value: stats.totalLessonsCompleted || 0, label: 'Lessons Done', color: '#06b6d4' },
            ].map((stat, idx) => (
              <FloatingCard key={stat.label} delay={idx * 0.1}>
                <AnalyticsCard {...stat} />
              </FloatingCard>
            ))}
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)' }}>Learning Activity</h2>
            <FilterBar value={range} onChange={setRange} />
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '1.25rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <ChartCard title="Lessons Completed Over Time" subtitle={`Last ${range === '7d' ? '7 days' : range === '30d' ? '30 days' : range}`}>
                {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                  <LineChart data={analytics?.activityData || []} color="#6366f1" height={180} />
                )}
              </ChartCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <ChartCard title="Course Status Breakdown">
                {analyticsLoading ? <div className="skeleton" style={{ height: 180 }} /> : (
                  <DonutChart segments={analytics?.completionData || []} size={140} />
                )}
              </ChartCard>
            </motion.div>
          </div>

          {/* Progress by course bar chart */}
          {analytics?.enrolledCourses?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
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
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ── COURSES TAB ── */}
      {tab === 'courses' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <ChartCard title="Enrolled Courses" subtitle="All your courses with progress tracking">
            {loading ? <Loader /> : (
              <DataTable
                columns={courseTableCols}
                rows={analytics?.enrolledCourses || []}
                emptyMsg="No courses enrolled yet."
              />
            )}
          </ChartCard>
        </motion.div>
      )}

      {/* ── SCHEDULE TAB ── */}
      {tab === 'activity' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {upcomingClasses.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              style={{ background: 'var(--bg2)', border: '2px dashed var(--border)', borderRadius: 16, padding: '3rem', textAlign: 'center' }}
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>
                📅
              </motion.div>
              <p style={{ color: 'var(--text2)' }}>No upcoming live classes scheduled.</p>
            </motion.div>
          ) : upcomingClasses.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              style={{
                background: 'linear-gradient(135deg,#0f172a,#1e3a5f)',
                borderRadius: 12,
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                color: '#fff'
              }}
            >
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
              <motion.a
                href={uc.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  marginLeft: 'auto',
                  background: '#6366f1',
                  color: '#fff',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                🔗 Join
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StudentDashboardEnhanced;
