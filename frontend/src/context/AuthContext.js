import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { loginUser, registerUser, getMe, updateMe, changePassword } from '../api/authService';

export const AuthContext = createContext(null);

const normalizeUser = (u) => ({ ...u, id: u._id || u.id });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutCallbacks = useRef([]);

  // Allow other contexts to register cleanup on logout
  const onLogout = useCallback((cb) => {
    logoutCallbacks.current.push(cb);
    return () => { logoutCallbacks.current = logoutCallbacks.current.filter(f => f !== cb); };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('ssp_user');
    const token  = localStorage.getItem('ssp_token');
    if (stored && token) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
      getMe().then(res => {
        const fresh = normalizeUser(res.data.user);
        setUser(fresh);
        localStorage.setItem('ssp_user', JSON.stringify(fresh));
      }).catch(() => {
        localStorage.removeItem('ssp_token');
        localStorage.removeItem('ssp_user');
        setUser(null);
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    const { data } = await loginUser(credentials);
    const u = normalizeUser(data.user);
    localStorage.setItem('ssp_token', data.token);
    localStorage.setItem('ssp_user', JSON.stringify(u));
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async (userData) => {
    const { data } = await registerUser(userData);
    const u = normalizeUser(data.user);
    localStorage.setItem('ssp_token', data.token);
    localStorage.setItem('ssp_user', JSON.stringify(u));
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ssp_token');
    localStorage.removeItem('ssp_user');
    // Run all registered cleanup callbacks
    logoutCallbacks.current.forEach(cb => { try { cb(); } catch {} });
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (data) => {
    const res = await updateMe(data);
    const u = normalizeUser(res.data.user);
    setUser(u);
    localStorage.setItem('ssp_user', JSON.stringify(u));
    return u;
  }, []);

  const updatePassword = useCallback(async (data) => {
    const res = await changePassword(data);
    if (res.data.token) localStorage.setItem('ssp_token', res.data.token);
    return res.data;
  }, []);

  return (
    <AuthContext.Provider value={{
      user, loading, login, register, logout, updateProfile, updatePassword, onLogout,
      isStudent: user?.role === 'student',
      isMentor:  user?.role === 'mentor',
    }}>
      {children}
    </AuthContext.Provider>
  );
};
