# Deploy Full Stack to Vercel

## Step 1: MongoDB Atlas Setup (Same for all platforms)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email/password
4. Verify email

### 1.2 Create Free Cluster
1. Click "Create" → "Build a Cluster"
2. Select "M0 Free" tier
3. Choose cloud provider (AWS recommended)
4. Choose region closest to you
5. Click "Create Cluster"
6. Wait 5-10 minutes for cluster to be ready

### 1.3 Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `skilluser`
4. Password: `skillpass123`
5. Built-in Role: `Atlas admin`
6. Click "Add User"

### 1.4 Whitelist IP Address
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0` (allows all IPs)
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Clusters" → Click "Connect"
2. Select "Connect your application"
3. Copy connection string
4. Replace `<password>` with `skillpass123`
5. Replace `<database>` with `skillsphere`
6. Final URL: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`

## Step 2: Deploy on Vercel

### 2.1 Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### 2.2 Import Project
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Choose your GitHub repo: `skill-sharing-platform-shivam`
5. Click "Import"

### 2.3 Configure Project
- **Project Name**: `skill-sharing-platform-shivam`
- **Framework Preset**: `Create React App`
- **Root Directory**: `.` (root)
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 2.4 Add Environment Variables
Click "Environment Variables" and add:
```
MONGO_URI=mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
JWT_SECRET=skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://skill-sharing-platform-shivam.vercel.app
```

### 2.5 Deploy
1. Click "Deploy"
2. Wait for deployment (3-5 minutes)
3. Your app is live at: `https://skill-sharing-platform-shivam.vercel.app`

## Step 3: Deploy Frontend to GitHub Pages

### 3.1 Update .env.production
```
REACT_APP_API_URL=https://skill-sharing-platform-shivam.vercel.app
```

### 3.2 Deploy
```bash
npm run deploy
```

## Step 4: Test Everything

### 4.1 Test Backend API
Visit: `https://skill-sharing-platform-shivam.vercel.app/api/health`
Should return: `{ "status": "ok", "message": "SkillSphere API running", ... }`

### 4.2 Test Frontend
Visit: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- Try Sign Up
- Try Login
- Try creating a course

### 4.3 Check Logs
In Vercel dashboard, click your project → "Deployments" → Latest deployment → "Logs"

## Troubleshooting

### "Cannot find module" errors
- ✅ Fixed: All backend dependencies are in root `package.json`
- Verify `package.json` has: express, mongoose, cors, helmet, bcryptjs, jsonwebtoken, express-rate-limit, joi, dotenv

### "Database connection failed"
- Verify MONGO_URI in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify username/password are correct

### "CORS errors"
- Verify CLIENT_URL is set in Vercel environment
- Check `api/index.js` includes your frontend URL in allowedOrigins

### Frontend shows network errors
- Verify REACT_APP_API_URL points to correct Vercel URL
- Check browser console for exact error
- Verify backend is running (check Vercel logs)

### Build fails
- Check `vercel.json` has correct buildCommand
- Verify no syntax errors in code
- Check all dependencies are installed

## Important Notes

- **Vercel Free Tier**: Includes 100GB bandwidth/month
- **MongoDB Atlas Free**: 512MB storage, 3 shared nodes
- **Cold Starts**: Serverless functions may have slight delay on first request
- **Keep Alive**: Use monitoring service to prevent cold starts

## Comparison: Vercel vs Render

| Feature | Vercel | Render |
|---------|--------|--------|
| Frontend Hosting | ✅ Excellent | ✅ Good |
| Backend Hosting | ✅ Serverless | ✅ Always-on |
| Free Tier | ✅ Generous | ✅ Limited |
| Cold Starts | ⚠️ Yes | ❌ No |
| Bandwidth | 100GB/month | Limited |
| Best For | Full-stack React | Traditional Node.js |

**Recommendation**: Use Vercel for simplicity (everything in one place), or Render for traditional backend hosting.
