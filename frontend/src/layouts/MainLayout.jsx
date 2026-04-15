import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = ({ children }) => (
  <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh', background:'var(--bg)', transition:'background 0.3s' }}>
    <Navbar />
    <main style={{ flex:1, maxWidth:1200, width:'100%', margin:'0 auto', padding:'2rem 1.5rem' }}>
      {children}
    </main>
    <Footer />
  </div>
);
export default MainLayout;
