# Complete Deployment Fix Guide

## Current Status
- ✅ Frontend deployed to GitHub Pages
- ❌ Backend not responding (environment variables not set)
- ❌ Login/Signup failing due to backend connection

## Step 1: Set Up MongoDB Atlas (Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project (name: "skill-sharing-platform")
4. Create a cluster:
   - Select "Free" tier
   - Choose region closest to you
   - Click "Create Cluster"
5. Wait 5-10 minutes for cluster to be ready
6. Go to "Database Access" → "Add New Database User"
   - Username: `skilluser`
   - Password: `skillpass123`
   - Click "Add User"
7. Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
8. Go to "Clusters" → Click "Connect"
   - Select "Drivers"
   - Copy the connection string
   - Replace `<password>` with `skillpass123`
   - Replace `<username>` with `skilluser`
   - Example: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Vercel

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository: `skill-sharing-platform-shivam`
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (root)
   - **Build Command**: `npm install && cd backend && npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables (click "Add"):
   ```
   MONGO_URI = mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
   JWT_SECRET = skillsphere_super_secret_jwt_key_2024
   JWT_EXPIRE = 7d
   NODE_ENV = production
   CLIENT_URL = https://shivamsingh10x.github.io/skill-sharing-platform-shivam
   ```

6. Click "Deploy"
7. Wait 3-5 minutes for deployment to complete
8. Once deployed, you'll get a URL like: `https://skill-sharing-platform-shivam.vercel.app`

## Step 3: Test Backend Health

1. Open browser and go to:
   ```
   https://skill-sharing-platform-shivam.vercel.app/api/health
   ```
2. You should see:
   ```json
   {
     "status": "ok",
     "message": "SkillSphere API running",
     "timestamp": "2024-...",
     "environment": "production"
   }
   ```

## Step 4: Update Frontend with Backend URL

1. Update `.env.production`:
   ```
   REACT_APP_API_URL=https://skill-sharing-platform-shivam.vercel.app/api
   ```

2. Commit and push to GitHub:
   ```bash
   git add .env.production
   git commit -m "Update backend URL for Vercel deployment"
   git push origin main
   ```

3. Redeploy frontend to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Step 5: Test Full Stack

1. Go to: https://shivamsingh10x.github.io/skill-sharing-platform-shivam
2. Try to sign up with test credentials:
   - Email: test@example.com
   - Password: Test@123
3. Check browser console (F12) for any errors
4. If successful, you should be logged in

## Troubleshooting

### Backend still not responding
- Check Vercel deployment logs: https://vercel.com/dashboard
- Verify all 5 environment variables are set
- Check MongoDB Atlas connection string is correct
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Login/Signup still failing
- Open browser DevTools (F12)
- Go to Network tab
- Try to sign up
- Check the API request to `/api/auth/register`
- Look for error message in response

### CORS errors
- Check that `CLIENT_URL` environment variable is set correctly
- Verify frontend URL matches exactly

## Quick Reference

| Component | URL |
|-----------|-----|
| Frontend | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |
| Backend API | https://skill-sharing-platform-shivam.vercel.app/api |
| Health Check | https://skill-sharing-platform-shivam.vercel.app/api/health |
| MongoDB | mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere |

