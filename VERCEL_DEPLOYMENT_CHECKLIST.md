# Vercel Deployment Checklist - Backend

## What's Already Done ✅
- Backend code is ready
- Frontend code is ready
- `vercel.json` is configured
- `api/index.js` is set up as serverless function
- All routes are connected

## What You Need to Do (3 Simple Steps)

### Step 1: On Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select: `skill-sharing-platform-shivam` repository
4. Click "Import"

### Step 2: Configure Project
On the "New Project" screen:
- **Framework Preset**: Keep as `Create React App`
- **Root Directory**: Select `.` (root)
- **Build Command**: `npm install && cd backend && npm install`
- **Output Directory**: `build`

### Step 3: Add Environment Variables
Click "Add" for each variable:

| Key | Value |
|-----|-------|
| `MONGO_URI` | `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority` |
| `JWT_SECRET` | `skillsphere_super_secret_jwt_key_2024` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://shivamsingh10x.github.io/skill-sharing-platform-shivam` |

**Note:** Replace `cluster0.xxxxx` with your actual MongoDB Atlas cluster name

### Step 4: Deploy
Click "Deploy" button and wait 3-5 minutes

### Step 5: Test Backend
Open in browser:
```
https://skill-sharing-platform-shivam.vercel.app/api/health
```

Should show:
```json
{
  "status": "ok",
  "message": "SkillSphere API running",
  "timestamp": "...",
  "environment": "production"
}
```

## If You Don't Have MongoDB Atlas Yet

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster (free tier)
4. Create user: `skilluser` / `skillpass123`
5. Allow access from anywhere (0.0.0.0/0)
6. Get connection string and use above

## After Deployment

Update frontend with backend URL:
```bash
npm run deploy
```

Then test login/signup at:
```
https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

