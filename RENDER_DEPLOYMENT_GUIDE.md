# Deploy to Render - Complete Guide

## Backend Deployment on Render

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account
3. Authorize Render to access your GitHub repositories

### Step 2: Create Backend Service
1. Click "New +" → "Web Service"
2. Select repository: `skillsharing`
3. Configure:
   - **Name**: `skillsharing-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Root Directory**: `.` (leave empty or use root)

### Step 3: Set Environment Variables
In Render dashboard, go to Environment:
```
PORT=5000
MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10
JWT_SECRET=skillsphere_super_secret_jwt_key_2024
JWT_EXPIRE=7d
NODE_ENV=production
CLIENT_URL=https://shivamsingh10x.github.io/skillsharing
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment (5-10 minutes)
- Get your backend URL: `https://skillsharing-backend.onrender.com`

---

## Frontend Deployment on GitHub Pages

### Step 1: Update Frontend Configuration
Edit `package.json`:
```json
{
  "homepage": "https://shivamsingh10x.github.io/skillsharing",
  ...
}
```

### Step 2: Update API URL
Edit `.env.production`:
```
REACT_APP_API_URL=https://skillsharing-backend.onrender.com/api
```

### Step 3: Deploy to GitHub Pages
```bash
cd skill-sharing-platform
npm run deploy
```

Your frontend will be live at: `https://shivamsingh10x.github.io/skillsharing`

---

## Testing After Deployment

1. **Frontend**: https://shivamsingh10x.github.io/skillsharing
2. **Backend API**: https://skillsharing-backend.onrender.com/api/health
3. **Login**: Use demo account
   - Email: `mentor@skillsphere.com`
   - Password: `mentor123`

---

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify MongoDB connection string
- Ensure all environment variables are set

### Frontend can't connect to backend
- Check CORS settings in `backend/server.js`
- Verify `CLIENT_URL` environment variable
- Check browser console for errors

### MongoDB connection fails
- Verify IP whitelist in MongoDB Atlas
- Check connection string format
- Ensure database exists

---

## Next Steps

1. ✅ Push code to GitHub
2. ⏳ Deploy backend to Render
3. ⏳ Deploy frontend to GitHub Pages
4. ⏳ Test all features
5. ⏳ Monitor logs and performance
