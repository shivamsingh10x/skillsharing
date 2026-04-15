import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = ({ children }) => (
  <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)', transition:'background 0.3s' }}>
    <Navbar />
    <div style={{ display:'flex', flex:1 }}>
      <Sidebar />
      <main style={{ flex:1, padding:'2rem', background:'var(--bg)', minHeight:'calc(100vh - 66px)' }}>{children}</main>
    </div>
  </div>
);
export default DashboardLayout;
