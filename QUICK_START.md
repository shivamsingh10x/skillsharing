# Quick Start Guide - Skill Sharing Platform

## Local Development (5 minutes)

### 1. Install Dependencies
```bash
npm install
cd backend && npm install && cd ..
```

### 2. Setup MongoDB
- **Option A**: Local MongoDB
  ```bash
  # Windows: Download from https://www.mongodb.com/try/download/community
  # Start MongoDB service
  ```

- **Option B**: MongoDB Atlas (Cloud - Recommended)
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Create free cluster
  3. Add user (username & password)
  4. Whitelist 0.0.0.0/0
  5. Copy connection string

### 3. Create Environment Files

**`.env` (Frontend)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**`backend/.env`**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillsphere
JWT_SECRET=test_secret_key_2024
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm start
```

Visit: http://localhost:3000

## Test Login/Signup

### Sign Up
1. Click "Register"
2. Enter: Name, Email, Password
3. Select Role: Student or Mentor
4. Click "Sign Up"

### Login
1. Click "Login"
2. Enter email & password from signup
3. Click "Login"

## Production Deployment (Vercel + GitHub)

### Step 1: MongoDB Atlas
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Add database user
3. Whitelist 0.0.0.0/0
4. Copy connection string

### Step 2: GitHub Setup
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skill-sharing-platform-new.git
git push -u origin main
```

### Step 3: Vercel Deployment
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select repository
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your GitHub Pages URL
6. Click "Deploy"

### Step 4: Update Frontend URL
1. Copy Vercel domain (e.g., `https://your-project.vercel.app`)
2. Update `.env.production`:
   ```
   REACT_APP_API_URL=https://your-project.vercel.app/api
   ```
3. Push & deploy:
   ```bash
   git add .env.production
   git commit -m "Update Vercel URL"
   git push origin main
   npm run deploy
   ```

## Common Issues

### "Cannot POST /api/auth/register"
- Backend not running
- MongoDB not connected
- Check backend logs

### "CORS error"
- Verify `CLIENT_URL` in backend
- Check frontend URL matches

### "MongoDB connection failed"
- Check connection string
- Verify IP whitelist (0.0.0.0/0)
- Check username/password

### "Token invalid"
- Clear localStorage
- Try logging in again
- Check `JWT_SECRET` is same

## Useful Commands

```bash
# Frontend only
npm start

# Backend only
cd backend && npm run dev

# Both (concurrent)
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Check health
curl http://localhost:5000/api/health
```

## File Structure

```
skill-sharing-platform/
├── .env                 # Frontend env (local)
├── .env.production      # Frontend env (production)
├── src/                 # React code
├── backend/
│   ├── .env            # Backend env (local)
│   ├── .env.example    # Backend env template
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── controllers/    # Route logic
│   └── server.js       # Backend entry
├── api/
│   └── index.js        # Vercel serverless
├── vercel.json         # Vercel config
└── package.json        # Dependencies
```

## Next Steps

1. ✅ Setup local development
2. ✅ Test login/signup
3. ✅ Create GitHub repository
4. ✅ Deploy on Vercel
5. ✅ Test production

## Support

- Check browser console (F12) for errors
- Check backend logs for API errors
- Check Vercel logs for deployment issues
- Read DEPLOYMENT_GUIDE.md for detailed steps
