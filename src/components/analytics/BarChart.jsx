import { useTheme } from '../../context/ThemeContext';

/**
 * Pure SVG bar chart — no dependencies.
 * data: [{ label: 'React', value: 12, color?: '#6366f1' }, ...]
 */
const BarChart = ({ data = [], height = 180, color = '#6366f1', unit = '' }) => {
  const { dark } = useTheme();
  if (!data.length) return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No data yet</div>;

  const W = 600, H = height;
  const PAD = { top: 16, right: 16, bottom: 36, left: 44 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const max = Math.max(...data.map(d => d.value)) || 1;
  const barW = Math.max(8, (chartW / data.length) * 0.55);
  const gap = chartW / data.length;

  const textColor = dark ? '#94a3b8' : '#9ca3af';
  const gridColor = dark ? '#334155' : '#f3f4f6';
  const gridLines = 4;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height, overflow: 'visible' }}>
      <defs>
        {data.map((d, i) => (
          <linearGradient key={i} id={`bar-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={d.color || color} stopOpacity={1} />
            <stop offset="100%" stopColor={d.color || color} stopOpacity={0.6} />
          </linearGradient>
        ))}
      </defs>

      {/* Grid */}
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const y = PAD.top + (chartH / gridLines) * i;
        const val = max - (max / gridLines) * i;
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y} stroke={gridColor} strokeWidth={1} />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize={10} fill={textColor}>{Math.round(val)}{unit}</text>
          </g>
        );
      })}

      {/* Bars */}
      {data.map((d, i) => {
        const barH = (d.value / max) * chartH;
        const x = PAD.left + i * gap + (gap - barW) / 2;
        const y = PAD.top + chartH - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={barH} rx={4} fill={`url(#bar-grad-${i})`} />
            <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize={10} fontWeight={700} fill={d.color || color}>{d.value}{unit}</text>
            <text x={x + barW / 2} y={PAD.top + chartH + 18} textAnchor="middle" fontSize={10} fill={textColor}>{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
};

export default BarChart;
