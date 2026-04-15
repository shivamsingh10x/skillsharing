import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Reusable sortable + searchable data table.
 * columns: [{ key, label, render?, sortable? }]
 * rows: array of objects
 */
const DataTable = ({ columns = [], rows = [], searchable = true, emptyMsg = 'No data found' }) => {
  const { dark } = useTheme();
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortDir, setSortDir] = useState('asc');

  const bg = dark ? '#1e293b' : '#fff';
  const border = dark ? '#334155' : '#e5e7eb';
  const text = dark ? '#f1f5f9' : '#111827';
  const sub = dark ? '#94a3b8' : '#6b7280';
  const rowHover = dark ? '#334155' : '#f9fafb';
  const headerBg = dark ? '#0f172a' : '#f9fafb';

  const handleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = rows.filter(row =>
    !search || columns.some(col => String(row[col.key] ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = sortKey
    ? [...filtered].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : filtered;

  return (
    <div>
      {searchable && (
        <div style={{ marginBottom: '1rem' }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '0.55rem 1rem', border: `1.5px solid ${border}`, borderRadius: 8, fontSize: '0.875rem', outline: 'none', background: bg, color: text, width: '100%', maxWidth: 280, fontFamily: 'inherit' }}
          />
        </div>
      )}
      <div style={{ overflowX: 'auto', borderRadius: 12, border: `1px solid ${border}` }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {columns.map(col => (
                <th key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 700, color: sub, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: col.sortable !== false ? 'pointer' : 'default', userSelect: 'none', whiteSpace: 'nowrap', borderBottom: `1px solid ${border}` }}>
                  {col.label}
                  {sortKey === col.key && <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr><td colSpan={columns.length} style={{ padding: '2rem', textAlign: 'center', color: sub }}>{emptyMsg}</td></tr>
            ) : sorted.map((row, i) => (
              <tr key={i}
                style={{ borderBottom: i < sorted.length - 1 ? `1px solid ${border}` : 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = rowHover}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '0.75rem 1rem', color: text, verticalAlign: 'middle' }}>
                    {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: sub }}>
        Showing {sorted.length} of {rows.length} entries
      </div>
    </div>
  );
};

export default DataTable;
