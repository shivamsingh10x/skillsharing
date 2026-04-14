# 🚀 Vercel Deployment - Step by Step with Screenshots

## Prerequisites
- ✅ GitHub account with repository pushed
- ✅ MongoDB Atlas account with connection string ready
- ✅ Vercel account (free)

---

## Step 1: Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Sign in with GitHub
3. You should see your dashboard

---

## Step 2: Create New Project

1. Click **"New Project"** button (top right)
2. Click **"Import Git Repository"**
3. Paste this URL:
   ```
   https://github.com/shivamsingh10x/skill-sharing-platform-shivam
   ```
4. Click **"Continue"**

---

## Step 3: Configure Project Settings

### 3.1 Framework
- Select: **React**

### 3.2 Root Directory
- **IMPORTANT**: Set to `.` (single dot)
- This tells Vercel to use the root of the repository

### 3.3 Build Command
- Set to: `npm run build:backend && react-scripts build`
- This installs backend dependencies and builds frontend

### 3.4 Output Directory
- Set to: `build`
- This is where the built frontend files go

---

## Step 4: Add Environment Variables

Click **"Environment Variables"** section and add these 5 variables:

### Variable 1: MONGO_URI
- **Key**: `MONGO_URI`
- **Value**: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere`
  - Replace `xxxxx` with your MongoDB cluster ID
- Click **"Add"**

### Variable 2: JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: `skillsphere_super_secret_jwt_key_2024`
- Click **"Add"**

### Variable 3: JWT_EXPIRE
- **Key**: `JWT_EXPIRE`
- **Value**: `7d`
- Click **"Add"**

### Variable 4: NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`
- Click **"Add"**

### Variable 5: CLIENT_URL
- **Key**: `CLIENT_URL`
- **Value**: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- Click **"Add"**

---

## Step 5: Deploy

1. Click **"Deploy"** button
2. Wait 3-5 minutes for deployment
3. You should see: **"✅ Deployment successful!"**
4. Your backend URL will be shown (e.g., `https://skill-sharing-platform-shivam.vercel.app`)

---

## Step 6: Verify Deployment

### 6.1 Test Backend Health Check
1. Open this URL in browser:
   ```
   https://skill-sharing-platform-shivam.vercel.app/api/health
   ```
2. You should see JSON response:
   ```json
   {
     "status": "ok",
     "message": "SkillSphere API running",
     "timestamp": "2024-...",
     "environment": "production"
   }
   ```

### 6.2 Test Frontend
1. Open: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
2. Frontend should load without errors

### 6.3 Test Sign Up
1. Click **"Register"** button
2. Fill in:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Sign Up"**
4. Should see success message

### 6.4 Test Login
1. Click **"Login"** button
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Login"**
4. Should be logged in and see dashboard

---

## Troubleshooting

### Deploy Button Not Clickable
- **Solution**: Make sure Root Directory is set to `.` (single dot)
- Click "Edit" and fix it

### Build Fails
- Check Vercel logs for errors
- Make sure all environment variables are set
- Verify MongoDB connection string is correct

### Backend Health Check Returns Error
- Check Vercel logs
- Verify MONGO_URI environment variable
- Verify MongoDB Atlas cluster is running
- Verify MongoDB user was created

### Login/Signup Fails
1. Open browser console (F12)
2. Check Network tab
3. Look for error messages
4. Verify backend health check works first

### CORS Error
- Verify CLIENT_URL matches frontend URL exactly
- Check backend CORS configuration

---

## Success Checklist

- [ ] Vercel project created
- [ ] Root Directory set to `.`
- [ ] Build Command set correctly
- [ ] Output Directory set to `build`
- [ ] All 5 environment variables added
- [ ] Deployment successful
- [ ] Backend health check works
- [ ] Frontend loads
- [ ] Sign up works
- [ ] Login works

---

## Final URLs

| Component | URL |
|-----------|-----|
| Frontend | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |
| Backend API | https://skill-sharing-platform-shivam.vercel.app/api |
| Backend Health | https://skill-sharing-platform-shivam.vercel.app/api/health |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## Done! 🎉

Your full-stack app is now live!

- Frontend: https://shivamsingh10x.github.io/skill-sharing-platform-shivam
- Backend: https://skill-sharing-platform-shivam.vercel.app/api
- Database: MongoDB Atlas

**Share your app with friends!**
