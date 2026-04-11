# Backend Deployment - Complete Step-by-Step Guide

## Current Status
- ✅ Frontend: Live on GitHub Pages
- ⏳ Backend: Ready for Vercel deployment
- ⚠️ Network Error: Backend not deployed yet

---

## Why Network Error?

Backend API is not deployed yet. Frontend is trying to connect to backend but it's not available.

---

## Complete Backend Deployment Process

### Phase 1: MongoDB Atlas Setup (5 minutes)

#### Step 1.1: Create MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with your email
4. Verify email

#### Step 1.2: Create Organization & Project
1. Create Organization (any name)
2. Create Project (any name)
3. Click "Create Deployment"

#### Step 1.3: Create Cluster
1. Select "Free" tier
2. Choose region (closest to you)
3. Click "Create Deployment"
4. Wait 2-3 minutes for cluster creation

#### Step 1.4: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Username: `skilluser`
4. Password: `skillpass123`
5. Click "Add User"

#### Step 1.5: Setup Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

#### Step 1.6: Get Connection String
1. Go to "Databases"
2. Click "Connect" button
3. Select "Drivers"
4. Copy connection string
5. Replace `<username>` with `skilluser`
6. Replace `<password>` with `skillpass123`
7. Replace `myFirstDatabase` with `skillsphere`

**Final string:**
```
mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
```

---

### Phase 2: Vercel Deployment (10 minutes)

#### Step 2.1: Go to Vercel
1. Go to: https://vercel.com/dashboard
2. Sign in with GitHub (if not already)

#### Step 2.2: Create New Project
1. Click "New Project"
2. Click "Import Git Repository"
3. Paste: `https://github.com/shivamsingh10x/skill-sharing-platform-shivam`
4. Click "Continue"

#### Step 2.3: Configure Project
- **Framework Preset:** React
- **Root Directory:** ./
- **Build Command:** `npm run build:backend && react-scripts build`
- **Output Directory:** build
- **Install Command:** `npm install && cd backend && npm install`

#### Step 2.4: Add Environment Variables
Click "Environment Variables" and add:

```
MONGO_URI = mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
JWT_SECRET = skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE = 7d
NODE_ENV = production
CLIENT_URL = https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

**IMPORTANT:** Replace `cluster0.xxxxx` with your actual MongoDB cluster name!

#### Step 2.5: Deploy
1. Click "Deploy" button
2. Wait 3-5 minutes for deployment
3. You'll see: "✅ Deployment successful!"

#### Step 2.6: Get Backend URL
Vercel will show your domain:
```
https://skill-sharing-platform-shivam.vercel.app
```

---

### Phase 3: Testing (5 minutes)

#### Step 3.1: Test Backend Health
```
https://skill-sharing-platform-shivam.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "SkillSphere API running",
  "timestamp": "2026-04-11T...",
  "environment": "production"
}
```

#### Step 3.2: Test Frontend
1. Go to: https://shivamsingh10x.github.io/skill-sharing-platform-shivam
2. Network error should be gone!
3. Click "Register"
4. Fill form:
   - Full Name: Test User
   - Email: test@example.com
   - Password: password123
   - Role: Student
5. Click "Sign Up"
6. Should see success!

#### Step 3.3: Test Login
1. Click "Login"
2. Email: test@example.com
3. Password: password123
4. Click "Login"
5. Should be logged in!

---

## Troubleshooting

### Backend deployment fails
- Check Vercel logs
- Verify all environment variables are set
- Check MongoDB connection string

### Still getting network error
- Hard refresh: Ctrl + Shift + R
- Clear browser cache
- Check if Vercel deployment is complete

### Login/Signup fails
- Open browser console (F12)
- Check network tab
- Look for error messages
- Check Vercel logs

---

## Final Links

| Component | URL |
|-----------|-----|
| Frontend | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |
| Backend API | https://skill-sharing-platform-shivam.vercel.app/api |
| Backend Health | https://skill-sharing-platform-shivam.vercel.app/api/health |
| GitHub | https://github.com/shivamsingh10x/skill-sharing-platform-shivam |
| Vercel Dashboard | https://vercel.com/dashboard |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |

---

## Success Checklist

- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created (skilluser/skillpass123)
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string copied
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Backend health check works
- [ ] Frontend loads without network error
- [ ] Sign Up works
- [ ] Login works

---

## Done! 🎉

Your full-stack app is now live!

**Frontend:** https://shivamsingh10x.github.io/skill-sharing-platform-shivam
**Backend:** https://skill-sharing-platform-shivam.vercel.app/api
