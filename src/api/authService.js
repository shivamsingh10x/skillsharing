import axiosInstance from './axiosConfig';

// POST /api/auth/register
export const registerUser = (userData) => axiosInstance.post('/auth/register', userData);

// POST /api/auth/login
export const loginUser = (credentials) => axiosInstance.post('/auth/login', credentials);

// GET /api/auth/me
export const getMe = () => axiosInstance.get('/auth/me');

// PUT /api/auth/me — update profile
export const updateMe = (data) => axiosInstance.put('/auth/me', data);

// PUT /api/auth/password — change password
export const changePassword = (data) => axiosInstance.put('/auth/password', data);
