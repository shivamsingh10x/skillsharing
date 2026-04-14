# Deploy Backend to Render.com

## Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your repositories

## Step 2: Create MongoDB Atlas Database

### 2.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Create account with email/password
4. Verify email

### 2.2 Create Free Cluster
1. Click "Create" → "Build a Cluster"
2. Select "M0 Free" tier
3. Choose cloud provider (AWS recommended)
4. Choose region closest to you
5. Click "Create Cluster"
6. Wait 5-10 minutes for cluster to be ready

### 2.3 Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Username: `skilluser`
4. Password: `skillpass123`
5. Built-in Role: `Atlas admin`
6. Click "Add User"

### 2.4 Whitelist IP Address
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. Enter: `0.0.0.0/0` (allows all IPs - for development)
4. Click "Confirm"

### 2.5 Get Connection String
1. Go to "Clusters" → Click "Connect"
2. Select "Connect your application"
3. Copy connection string
4. Replace `<password>` with `skillpass123`
5. Replace `<database>` with `skillsphere`
6. Final URL: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`

## Step 3: Deploy Backend on Render

### 3.1 Create New Web Service
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository"
4. Choose your GitHub repo: `skill-sharing-platform-shivam`
5. Click "Connect"

### 3.2 Configure Service
- **Name**: `skill-sharing-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node backend/server.js`
- **Instance Type**: `Free`

### 3.3 Add Environment Variables
Click "Environment" and add:
```
MONGO_URI=mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
JWT_SECRET=skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://shivamsingh10x.github.io/skill-sharing-platform-shivam
PORT=5000
```

### 3.4 Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your Render URL (e.g., `https://skill-sharing-backend.onrender.com`)

## Step 4: Update Frontend Configuration

### 4.1 Update .env.production
```
REACT_APP_API_URL=https://skill-sharing-backend.onrender.com
```

### 4.2 Update src/api/axiosConfig.js
Make sure it uses `REACT_APP_API_URL` from environment

### 4.3 Redeploy Frontend
```bash
npm run deploy
```

## Step 5: Test Deployment

### 5.1 Test Backend Health
Visit: `https://skill-sharing-backend.onrender.com/api/health`
Should return: `{ "status": "ok", "message": "SkillSphere API running", ... }`

### 5.2 Test Frontend
Visit: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
- Try Sign Up
- Try Login
- Try creating a course

### 5.3 Check Logs
In Render dashboard, click your service and check "Logs" for any errors

## Troubleshooting

### "Cannot find module" errors
- Ensure all dependencies are in root `package.json`
- Check `backend/package.json` has all required packages
- Run `npm install` locally to verify

### "MongoDB connection failed"
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Verify username/password are correct
- Check cluster is running in MongoDB Atlas

### "CORS errors"
- Verify CLIENT_URL is set correctly in Render environment
- Check `backend/server.js` includes your frontend URL in allowedOrigins

### Frontend shows network errors
- Verify REACT_APP_API_URL points to correct Render URL
- Check browser console for exact error message
- Verify backend is running (check Render logs)

### Render service keeps restarting
- Check logs for errors
- Verify all environment variables are set
- Check MongoDB connection string is correct

## Important Notes

- **Free Tier Limits**: Render free tier spins down after 15 minutes of inactivity
- **MongoDB Atlas**: Free tier has 512MB storage limit
- **Keep Alive**: To prevent spin-down, you can use a monitoring service like UptimeRobot
- **Production**: For production, upgrade to paid tiers

## Next Steps

1. Push all changes to GitHub
2. Follow steps above to deploy on Render
3. Test everything works
4. Share your live URLs!
