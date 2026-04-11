import React from 'react';

const Loader = ({ fullPage = false }) => {
  const style = fullPage
    ? { position:'fixed', inset:0, background:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999 }
    : { display:'flex', justifyContent:'center', padding:'2rem' };
  return (
    <div style={style}>
      <div style={{ width:40, height:40, border:'4px solid #e5e7eb', borderTopColor:'#6366f1', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
export default Loader;
