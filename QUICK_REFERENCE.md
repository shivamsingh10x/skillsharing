# 🔗 Quick Reference - URLs & Credentials

## MongoDB Atlas Credentials
```
Username: skilluser
Password: skillpass123
```

## MongoDB Connection String
```
mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
```
(Replace `xxxxx` with your actual cluster ID from MongoDB Atlas)

---

## Vercel Environment Variables

```
MONGO_URI=mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
JWT_SECRET=skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

---

## Important URLs

### Frontend (GitHub Pages)
```
https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

### Backend (Vercel)
```
https://skill-sharing-platform-shivam.vercel.app/api
```

### Backend Health Check
```
https://skill-sharing-platform-shivam.vercel.app/api/health
```

### GitHub Repository
```
https://github.com/shivamsingh10x/skill-sharing-platform-shivam
```

---

## Vercel Project Settings

- **Root Directory**: `.` (single dot)
- **Build Command**: `npm run build:backend && react-scripts build`
- **Output Directory**: `build`
- **Framework**: React

---

## Testing Endpoints

### Health Check
```
GET https://skill-sharing-platform-shivam.vercel.app/api/health
```

### Sign Up
```
POST https://skill-sharing-platform-shivam.vercel.app/api/auth/register
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login
```
POST https://skill-sharing-platform-shivam.vercel.app/api/auth/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}
```

---

## Troubleshooting Commands

### Check Frontend Build
```bash
npm run build
```

### Check Backend Dependencies
```bash
cd backend && npm install
```

### Test Backend Locally
```bash
cd backend && npm run dev
```

### Deploy Frontend
```bash
npm run deploy
```

---

## Success Indicators

✅ Backend health check returns JSON
✅ Frontend loads without errors
✅ Sign up creates new user
✅ Login returns JWT token
✅ Dashboard shows after login
