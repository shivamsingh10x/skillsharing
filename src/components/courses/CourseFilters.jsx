import React from 'react';
import { CATEGORIES, LEVELS } from '../../utils/constants';

const CourseFilters = ({ filters, onChange }) => {
  const set = (key, val) => onChange({ ...filters, [key]: val });
  const chip = (active) => ({
    background: active ? '#6366f1' : '#f3f4f6', color: active ? '#fff' : '#374151',
    border:'none', borderRadius:6, padding:'0.35rem 0.75rem', fontSize:'0.85rem',
    cursor:'pointer', textAlign:'left', marginBottom:'0.35rem', display:'block', width:'100%',
  });
  return (
    <aside style={{ width:220, flexShrink:0, background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:'1.25rem', height:'fit-content', position:'sticky', top:80 }}>
      <h3 style={{ fontSize:'1rem', fontWeight:700, marginBottom:'1rem' }}>Filters</h3>
      <div style={{ marginBottom:'1.25rem' }}>
        <div style={{ fontSize:'0.8rem', fontWeight:600, color:'#6b7280', textTransform:'uppercase', marginBottom:'0.5rem' }}>Category</div>
        {CATEGORIES.map(cat => (
          <button key={cat} style={chip(filters.category === (cat === 'All' ? '' : cat))}
            onClick={() => set('category', cat === 'All' ? '' : cat)}>{cat}</button>
        ))}
      </div>
      <div style={{ marginBottom:'1.25rem' }}>
        <div style={{ fontSize:'0.8rem', fontWeight:600, color:'#6b7280', textTransform:'uppercase', marginBottom:'0.5rem' }}>Level</div>
        {LEVELS.map(lvl => (
          <button key={lvl} style={chip(filters.level === lvl)}
            onClick={() => set('level', filters.level === lvl ? '' : lvl)}>{lvl}</button>
        ))}
      </div>
      <div style={{ marginBottom:'1.25rem' }}>
        <div style={{ fontSize:'0.8rem', fontWeight:600, color:'#6b7280', marginBottom:'0.5rem' }}>Max Price: ${filters.maxPrice}</div>
        <input type="range" min={0} max={100} value={filters.maxPrice}
          onChange={e => set('maxPrice', Number(e.target.value))}
          style={{ width:'100%', accentColor:'#6366f1' }} />
      </div>
      <button onClick={() => onChange({ category:'', level:'', maxPrice:100 })}
        style={{ width:'100%', padding:'0.5rem', background:'none', border:'1.5px solid #e5e7eb', borderRadius:8, cursor:'pointer', fontSize:'0.85rem', color:'#6b7280' }}>
        Clear Filters
      </button>
    </aside>
  );
};
export default CourseFilters;
