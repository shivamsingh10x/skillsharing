# 🚀 Deployment Checklist - Step by Step

## Current Status
- ✅ Frontend: LIVE on GitHub Pages
- ⏳ Backend: Ready for Vercel deployment

---

## STEP 1: MongoDB Atlas Setup (5 minutes)

### 1.1 Create MongoDB Account
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Click "Sign Up"
- [ ] Create account with your email
- [ ] Verify email

### 1.2 Create Cluster
- [ ] Click "Create Deployment"
- [ ] Select "Free" tier
- [ ] Choose region (closest to you)
- [ ] Click "Create Deployment"
- [ ] Wait 2-3 minutes for cluster creation

### 1.3 Create Database User
- [ ] Go to "Database Access" (left sidebar)
- [ ] Click "Add New Database User"
- [ ] Username: `skilluser`
- [ ] Password: `skillpass123`
- [ ] Click "Add User"

### 1.4 Allow Network Access
- [ ] Go to "Network Access" (left sidebar)
- [ ] Click "Add IP Address"
- [ ] Select "Allow access from anywhere" (0.0.0.0/0)
- [ ] Click "Confirm"

### 1.5 Get Connection String
- [ ] Go to "Databases" (left sidebar)
- [ ] Click "Connect" button
- [ ] Select "Drivers"
- [ ] Copy the connection string
- [ ] Replace `<username>` with `skilluser`
- [ ] Replace `<password>` with `skillpass123`
- [ ] Replace `myFirstDatabase` with `skillsphere`

**Your connection string should look like:**
```
mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
```

---

## STEP 2: Deploy Backend on Vercel (10 minutes)

### 2.1 Go to Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Sign in with GitHub

### 2.2 Create New Project
- [ ] Click "New Project"
- [ ] Click "Import Git Repository"
- [ ] Paste: `https://github.com/shivamsingh10x/skill-sharing-platform-shivam`
- [ ] Click "Continue"

### 2.3 Configure Project
- [ ] Framework: Select "React"
- [ ] Root Directory: Set to `.` (single dot)
- [ ] Build Command: `npm run build:backend && react-scripts build`
- [ ] Output Directory: `build`

### 2.4 Add Environment Variables
Click "Environment Variables" and add these 5 variables:

| Key | Value |
|-----|-------|
| MONGO_URI | mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere |
| JWT_SECRET | skillsphere_super_secret_jwt_key_2024 |
| JWT_EXPIRE | 7d |
| NODE_ENV | production |
| CLIENT_URL | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |

### 2.5 Deploy
- [ ] Click "Deploy" button
- [ ] Wait 3-5 minutes for deployment to complete
- [ ] You should see "✅ Deployment successful!"

---

## STEP 3: Verify Deployment (5 minutes)

### 3.1 Test Backend Health
- [ ] Open: `https://skill-sharing-platform-shivam.vercel.app/api/health`
- [ ] Should see JSON response with status "ok"

### 3.2 Test Frontend
- [ ] Open: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Should load without errors

### 3.3 Test Sign Up
- [ ] Click "Register"
- [ ] Fill in: Name, Email, Password
- [ ] Click "Sign Up"
- [ ] Should see success message

### 3.4 Test Login
- [ ] Click "Login"
- [ ] Enter email and password from sign up
- [ ] Click "Login"
- [ ] Should be logged in and see dashboard

---

## FINAL LINKS

| Component | URL |
|-----------|-----|
| Frontend | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |
| Backend API | https://skill-sharing-platform-shivam.vercel.app/api |
| Backend Health | https://skill-sharing-platform-shivam.vercel.app/api/health |
| GitHub Repo | https://github.com/shivamsingh10x/skill-sharing-platform-shivam |

---

## Troubleshooting

### If Backend Health Check Fails
1. Check Vercel deployment logs
2. Verify MongoDB connection string is correct
3. Verify all environment variables are set
4. Check that MongoDB user was created

### If Sign Up/Login Fails
1. Open browser console (F12)
2. Check Network tab for errors
3. Look for error messages in console
4. Verify backend health check works first

### If CORS Error
1. Verify CLIENT_URL matches frontend URL exactly
2. Check backend CORS configuration in `api/index.js`

---

## Success! 🎉

Once all steps are complete, your full-stack app will be:
- ✅ Frontend: Live on GitHub Pages
- ✅ Backend: Live on Vercel
- ✅ Database: Connected to MongoDB Atlas
- ✅ Login/Signup: Working end-to-end
