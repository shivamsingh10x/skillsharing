# Master Deployment Checklist

## Pre-Deployment (Do This First)

### Code Quality
- [ ] Run `npm run build` - should complete without errors
- [ ] Check for console warnings/errors
- [ ] Verify all routes work locally with `npm run dev`
- [ ] Test login/signup locally
- [ ] Test course creation locally

### Git Setup
- [ ] All changes committed: `git add .`
- [ ] Commit message: `git commit -m "Ready for deployment"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Verify changes on GitHub website

### Environment Files
- [ ] `.env` has local MongoDB URI
- [ ] `.env.production` has correct frontend URL
- [ ] `backend/.env` has all required variables
- [ ] No sensitive data in code (only in .env files)

---

## MongoDB Atlas Setup

### Account & Cluster
- [ ] Create MongoDB Atlas account
- [ ] Create free M0 cluster
- [ ] Wait for cluster to be ready (5-10 min)
- [ ] Cluster shows green status

### Database User
- [ ] Create user: `skilluser`
- [ ] Set password: `skillpass123`
- [ ] Assign role: `Atlas admin`
- [ ] User appears in "Database Access"

### Network Access
- [ ] Add IP: `0.0.0.0/0`
- [ ] Status shows "Active"
- [ ] Wait for changes to propagate (1-2 min)

### Connection String
- [ ] Get connection string from "Connect" button
- [ ] Replace `<username>` with `skilluser`
- [ ] Replace `<password>` with `skillpass123`
- [ ] Replace `<database>` with `skillsphere`
- [ ] Final format: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`
- [ ] Save connection string (you'll need it)

---

## Choose Deployment Platform

### Option A: Vercel (Recommended)

#### Vercel Setup
- [ ] Create Vercel account (sign up with GitHub)
- [ ] Authorize Vercel to access GitHub
- [ ] Go to https://vercel.com/dashboard

#### Import Project
- [ ] Click "Add New" → "Project"
- [ ] Select "Import Git Repository"
- [ ] Choose your GitHub repo
- [ ] Click "Import"

#### Configure
- [ ] Project Name: `skill-sharing-platform-shivam`
- [ ] Framework: `Create React App`
- [ ] Root Directory: `.` (root)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `build`

#### Environment Variables
- [ ] Add `MONGO_URI` = your MongoDB connection string
- [ ] Add `JWT_SECRET` = `skillsphere_super_secret_jwt_key_2024`
- [ ] Add `JWT_EXPIRE` = `7d`
- [ ] Add `NODE_ENV` = `production`
- [ ] Add `CLIENT_URL` = `https://skill-sharing-platform-shivam.vercel.app`

#### Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Check deployment status (should be "Ready")
- [ ] Copy Vercel URL

#### Post-Deploy
- [ ] Visit `/api/health` endpoint - should return status ok
- [ ] Update `.env.production` with Vercel URL
- [ ] Run `npm run deploy` to update GitHub Pages
- [ ] Test frontend at GitHub Pages URL

---

### Option B: Render (Alternative)

#### Render Setup
- [ ] Create Render account (sign up with GitHub)
- [ ] Authorize Render to access GitHub
- [ ] Go to https://dashboard.render.com

#### Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Select "Deploy an existing repository"
- [ ] Choose your GitHub repo
- [ ] Click "Connect"

#### Configure
- [ ] Name: `skill-sharing-backend`
- [ ] Environment: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `node backend/server.js`
- [ ] Instance Type: `Free`

#### Environment Variables
- [ ] Add `MONGO_URI` = your MongoDB connection string
- [ ] Add `JWT_SECRET` = `skillsphere_super_secret_jwt_key_2024`
- [ ] Add `JWT_EXPIRE` = `7d`
- [ ] Add `NODE_ENV` = `production`
- [ ] Add `CLIENT_URL` = `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Add `PORT` = `5000`

#### Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Check deployment status (should be "Live")
- [ ] Copy Render URL

#### Post-Deploy
- [ ] Visit `/api/health` endpoint - should return status ok
- [ ] Update `.env.production` with Render URL
- [ ] Run `npm run deploy` to update GitHub Pages
- [ ] Test frontend at GitHub Pages URL

---

## Frontend Deployment (GitHub Pages)

### Update Configuration
- [ ] Update `.env.production` with backend URL
- [ ] Verify `package.json` homepage: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Verify `src/api/axiosConfig.js` uses `REACT_APP_API_URL`

### Deploy
- [ ] Run: `npm run deploy`
- [ ] Wait for deployment (1-2 minutes)
- [ ] Check GitHub Pages settings (should show "Your site is live")

### Verify
- [ ] Visit: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Page loads without errors
- [ ] Check browser console (should be clean)

---

## Testing & Verification

### Backend Health Check
- [ ] Visit: `https://your-backend-url/api/health`
- [ ] Response: `{ "status": "ok", "message": "SkillSphere API running", ... }`
- [ ] Status code: 200

### Frontend Loading
- [ ] Visit: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Page loads completely
- [ ] No 404 errors
- [ ] No CORS errors in console

### Authentication
- [ ] Click "Sign Up"
- [ ] Fill form and submit
- [ ] Should create user in MongoDB
- [ ] Should redirect to login
- [ ] Login with new credentials
- [ ] Should show dashboard

### Course Creation
- [ ] Login as mentor
- [ ] Go to "Create Course"
- [ ] Fill form and submit
- [ ] Course should appear in list
- [ ] Should be saved in MongoDB

### Error Handling
- [ ] Try invalid login
- [ ] Should show error message
- [ ] Try network error (disconnect internet)
- [ ] Should show network error message
- [ ] Reconnect and retry
- [ ] Should work again

---

## Troubleshooting

### Build Errors
- [ ] Check `npm run build` output
- [ ] Fix any syntax errors
- [ ] Verify all imports are correct
- [ ] Check for missing dependencies

### Deployment Errors
- [ ] Check deployment logs
- [ ] Verify environment variables are set
- [ ] Verify MongoDB connection string is correct
- [ ] Check for typos in variable names

### Runtime Errors
- [ ] Check backend logs
- [ ] Check browser console
- [ ] Check network tab (API calls)
- [ ] Verify CORS settings

### Database Errors
- [ ] Verify MongoDB Atlas cluster is running
- [ ] Verify IP whitelist includes 0.0.0.0/0
- [ ] Verify username/password are correct
- [ ] Verify connection string format

### CORS Errors
- [ ] Check `backend/server.js` allowedOrigins
- [ ] Verify frontend URL is in the list
- [ ] Verify `CLIENT_URL` environment variable is set
- [ ] Restart backend service

---

## Final Verification

### URLs
- [ ] Frontend URL: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- [ ] Backend URL: `https://your-backend-url`
- [ ] Health Check: `https://your-backend-url/api/health`

### Features
- [ ] Sign Up works
- [ ] Login works
- [ ] Create Course works
- [ ] View Courses works
- [ ] Leave Review works
- [ ] View Profile works

### Performance
- [ ] Frontend loads in < 3 seconds
- [ ] API responses in < 1 second
- [ ] No console errors
- [ ] No network errors

### Security
- [ ] HTTPS enabled (green lock)
- [ ] No sensitive data in console
- [ ] No API keys exposed
- [ ] CORS properly configured

---

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (optional)
- [ ] Monitor MongoDB usage
- [ ] Check deployment logs regularly
- [ ] Monitor uptime

### Maintenance
- [ ] Keep dependencies updated
- [ ] Monitor for security updates
- [ ] Backup MongoDB regularly
- [ ] Test disaster recovery

### Scaling
- [ ] Monitor performance metrics
- [ ] Upgrade MongoDB tier if needed
- [ ] Upgrade backend tier if needed
- [ ] Add caching if needed

---

## Success Criteria

✅ **You're Done When:**
1. Frontend loads at GitHub Pages URL
2. Backend responds at health check endpoint
3. Sign up creates user in MongoDB
4. Login works with created user
5. Course creation works
6. All features work without errors
7. No console errors or warnings
8. HTTPS enabled on all URLs

---

## Need Help?

1. **Vercel Issues**: See `VERCEL_DEPLOYMENT_GUIDE.md`
2. **Render Issues**: See `RENDER_DEPLOYMENT_GUIDE.md`
3. **MongoDB Issues**: See `MONGODB_ATLAS_SETUP.md`
4. **General Issues**: See `DEPLOYMENT_COMPARISON.md`

---

## Quick Reference

### Commands
```bash
# Local development
npm run dev

# Build frontend
npm run build

# Deploy frontend
npm run deploy

# Test backend locally
npm run server
```

### URLs
```
Frontend: https://shivamsingh10x.github.io/skill-sharing-platform-shivam
Backend: https://your-backend-url
Health: https://your-backend-url/api/health
```

### Environment Variables
```
MONGO_URI=mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
JWT_SECRET=skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

---

**Good luck with your deployment! 🚀**
