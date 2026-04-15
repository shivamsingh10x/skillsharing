import { useTheme } from '../../context/ThemeContext';

/**
 * Pure SVG line/area chart — no dependencies.
 * data: [{ label: 'Mon', value: 4 }, ...]
 */
const LineChart = ({ data = [], color = '#6366f1', height = 180, area = true, unit = '' }) => {
  const { dark } = useTheme();
  if (!data.length) return <div style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>No data yet</div>;

  const W = 600, H = height;
  const PAD = { top: 16, right: 16, bottom: 32, left: 40 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values) || 1;
  const range = max - min || 1;

  const xStep = chartW / (data.length - 1 || 1);
  const pts = data.map((d, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + chartH - ((d.value - min) / range) * chartH,
    ...d,
  }));

  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${PAD.top + chartH} L${pts[0].x},${PAD.top + chartH} Z`;

  const gridLines = 4;
  const textColor = dark ? '#94a3b8' : '#9ca3af';
  const gridColor = dark ? '#334155' : '#f3f4f6';

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height, overflow: 'visible' }}>
      {/* Grid lines */}
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const y = PAD.top + (chartH / gridLines) * i;
        const val = max - (range / gridLines) * i;
        return (
          <g key={i}>
            <line x1={PAD.left} y1={y} x2={PAD.left + chartW} y2={y} stroke={gridColor} strokeWidth={1} />
            <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize={10} fill={textColor}>{Math.round(val)}{unit}</text>
          </g>
        );
      })}

      {/* Area fill */}
      {area && <path d={areaPath} fill={`url(#grad-${color.replace('#', '')})`} opacity={0.15} />}

      {/* Gradient def */}
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.8} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>

      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots + labels */}
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={4} fill={color} stroke={dark ? '#1e293b' : '#fff'} strokeWidth={2} />
          <text x={p.x} y={PAD.top + chartH + 18} textAnchor="middle" fontSize={10} fill={textColor}>{p.label}</text>
        </g>
      ))}
    </svg>
  );
};

export default LineChart;
