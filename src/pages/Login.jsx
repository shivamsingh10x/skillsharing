import LoginForm from '../components/auth/LoginForm';

const Login = () => (
  <div style={{ minHeight:'calc(100vh - 64px)', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#eef2ff 0%,#faf5ff 100%)', padding:'2rem 1rem' }}>
    <LoginForm />
  </div>
);
export default Login;
