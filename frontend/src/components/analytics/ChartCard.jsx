import { useTheme } from '../../context/ThemeContext';

export const ChartCard = ({ title, subtitle, children, action }) => {
  const { dark } = useTheme();
  return (
    <div style={{ background: dark ? '#1e293b' : '#fff', border: `1px solid ${dark ? '#334155' : '#e5e7eb'}`, borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: dark ? '#f1f5f9' : '#111827', margin: 0 }}>{title}</h3>
          {subtitle && <p style={{ fontSize: '0.78rem', color: dark ? '#94a3b8' : '#6b7280', marginTop: '0.2rem' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
};

export const AnalyticsCard = ({ icon, value, label, change, color = '#6366f1', dark: darkProp }) => {
  const { dark } = useTheme();
  const d = darkProp !== undefined ? darkProp : dark;
  const isPos = change >= 0;
  return (
    <div style={{ background: d ? '#1e293b' : '#fff', border: `1px solid ${d ? '#334155' : '#e5e7eb'}`, borderRadius: 14, padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '1.6rem', fontWeight: 900, color: d ? '#f1f5f9' : '#111827', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.78rem', color: d ? '#94a3b8' : '#6b7280', marginTop: '0.2rem' }}>{label}</div>
      </div>
      {change !== undefined && (
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isPos ? '#10b981' : '#ef4444', background: isPos ? '#f0fdf4' : '#fef2f2', padding: '0.2rem 0.5rem', borderRadius: 6 }}>
          {isPos ? '↑' : '↓'} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
};
