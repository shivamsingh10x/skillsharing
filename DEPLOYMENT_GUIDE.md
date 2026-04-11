# Deployment Guide - Vercel + GitHub

## Step 1: MongoDB Atlas Setup (Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a free cluster
4. Go to "Database Access" → Add a user (username & password)
5. Go to "Network Access" → Add IP Address → Allow from anywhere (0.0.0.0/0)
6. Click "Connect" → Copy connection string
7. Replace `<username>` and `<password>` with your credentials
8. Replace `myFirstDatabase` with `skillsphere`

Example: `mongodb+srv://user:password@cluster.mongodb.net/skillsphere`

## Step 2: Push to GitHub

```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

## Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Click "Import"
6. In "Environment Variables" section, add:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Any strong secret (e.g., `skillsphere_super_secret_jwt_key_2024_production`)
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your GitHub Pages URL (e.g., `https://shivamsingh10x.github.io/skill-sharing-platform-new`)

7. Click "Deploy"
8. Wait for deployment to complete
9. Copy your Vercel domain (e.g., `https://your-project.vercel.app`)

## Step 4: Update Frontend URL

1. Update `.env.production`:
```
REACT_APP_API_URL=https://your-project.vercel.app
```

2. Push to GitHub:
```bash
git add .env.production
git commit -m "Update Vercel backend URL"
git push origin main
```

3. Redeploy frontend on GitHub Pages:
```bash
npm run deploy
```

## Step 5: Test

1. Go to your GitHub Pages URL
2. Try Login/Sign Up
3. Check browser console for errors
4. Check Vercel logs if issues occur

## Troubleshooting

### Backend not responding
- Check Vercel logs: https://vercel.com → Project → Deployments → Logs
- Verify MongoDB connection string in Vercel environment variables
- Check if MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Login/Signup not working
- Check browser console (F12 → Console tab)
- Verify `REACT_APP_API_URL` in `.env.production`
- Check network tab to see API requests

### CORS errors
- Verify `CLIENT_URL` environment variable in Vercel
- Check if frontend URL matches `CLIENT_URL` in backend

## Local Testing

```bash
# Install dependencies
npm install
cd backend && npm install && cd ..

# Create .env in backend folder with local MongoDB
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/skillsphere
# JWT_SECRET=test_secret
# NODE_ENV=development

# Run locally
npm run dev
```
