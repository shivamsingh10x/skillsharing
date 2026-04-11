# Vercel Deployment - Manual Steps

## ⚠️ IMPORTANT: MongoDB Atlas Setup Required First

Before deploying, you MUST have MongoDB Atlas setup:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Add database user (username & password)
4. Go to "Network Access" → Add IP → 0.0.0.0/0
5. Click "Connect" → Copy connection string
6. Replace `<username>` and `<password>` with your credentials
7. Replace `myFirstDatabase` with `skillsphere`

Example: `mongodb+srv://myuser:mypassword@cluster.mongodb.net/skillsphere`

---

## Vercel Deployment Steps

### Step 1: Go to Vercel Dashboard
https://vercel.com/dashboard

### Step 2: Create New Project
1. Click "New Project"
2. Click "Import Git Repository"
3. Paste: `https://github.com/shivamsingh10x/skill-sharing-platform-shivam`
4. Click "Continue"

### Step 3: Configure Project
- **Framework Preset:** React
- **Root Directory:** ./
- **Build Command:** `npm run build:backend && react-scripts build`
- **Output Directory:** build
- **Install Command:** `npm install && cd backend && npm install`

### Step 4: Add Environment Variables
Click "Environment Variables" and add:

| Key | Value |
|-----|-------|
| MONGO_URI | mongodb+srv://username:password@cluster.mongodb.net/skillsphere |
| JWT_SECRET | skillsphere_super_secret_jwt_key_2024 |
| JWT_EXPIRE | 7d |
| NODE_ENV | production |
| CLIENT_URL | https://shivamsingh10x.github.io/skill-sharing-platform-shivam |

**IMPORTANT:** Replace `username:password` with your MongoDB Atlas credentials!

### Step 5: Deploy
Click "Deploy" button

Wait 3-5 minutes for deployment...

### Step 6: Get Vercel Domain
After deployment, you'll see:
```
✅ Deployment successful!
Domain: https://skill-sharing-platform-shivam.vercel.app
```

### Step 7: Test Backend
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

### Step 8: Test Frontend
```
https://shivamsingh10x.github.io/skill-sharing-platform-shivam
```

Try Sign Up/Login - should work!

---

## Troubleshooting

### Backend not responding
- Check Vercel logs
- Verify MongoDB connection string
- Check environment variables are set

### Login/Signup fails
- Check browser console (F12)
- Check network tab for API errors
- Verify backend URL in .env.production

### CORS errors
- Verify CLIENT_URL matches frontend URL
- Check backend CORS configuration

---

## Links

- **Frontend:** https://shivamsingh10x.github.io/skill-sharing-platform-shivam
- **Backend:** https://skill-sharing-platform-shivam.vercel.app/api
- **GitHub:** https://github.com/shivamsingh10x/skill-sharing-platform-shivam
