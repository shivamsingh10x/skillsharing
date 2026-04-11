import { useTheme } from '../../context/ThemeContext';

/**
 * Pure SVG donut chart.
 * segments: [{ label, value, color }]
 */
const DonutChart = ({ segments = [], size = 140, thickness = 28 }) => {
  const { dark } = useTheme();
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size - thickness) / 2;
  const cx = size / 2, cy = size / 2;
  const circ = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments.map(seg => {
    const pct = seg.value / total;
    const dash = pct * circ;
    const arc = { ...seg, dash, gap: circ - dash, offset: circ - offset };
    offset += dash;
    return arc;
  });

  const textColor = dark ? '#f1f5f9' : '#111827';
  const subColor = dark ? '#94a3b8' : '#6b7280';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
      <svg width={size} height={size} style={{ flexShrink: 0 }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={dark ? '#334155' : '#f3f4f6'} strokeWidth={thickness} />
        {arcs.map((arc, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={arc.color} strokeWidth={thickness}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={arc.offset}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dasharray 0.5s ease' }}
          />
        ))}
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={18} fontWeight={900} fill={textColor}>{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={10} fill={subColor}>Total</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: subColor }}>{seg.label}</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: textColor, marginLeft: 'auto' }}>{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
