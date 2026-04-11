import { useTheme } from '../../context/ThemeContext';

const FilterBar = ({ value, onChange, options = ['7d', '30d', '90d', '1y'], labels = { '7d': '7 Days', '30d': '30 Days', '90d': '90 Days', '1y': '1 Year' } }) => {
  const { dark } = useTheme();
  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)}
          style={{
            padding: '0.35rem 0.85rem', borderRadius: 20, border: 'none', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            background: value === opt ? '#6366f1' : dark ? '#334155' : '#f3f4f6',
            color: value === opt ? '#fff' : dark ? '#94a3b8' : '#6b7280',
          }}>
          {labels[opt] || opt}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
