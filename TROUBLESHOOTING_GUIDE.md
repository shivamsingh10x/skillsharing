# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## Issue 1: Deploy Button Not Clickable on Vercel

### Symptoms
- Deploy button is grayed out
- Can't click Deploy
- Error message about Root Directory

### Solution
1. Go to Vercel project settings
2. Click **"Edit"** next to Root Directory
3. Change it to `.` (single dot)
4. Click **"Save"**
5. Now Deploy button should be clickable

---

## Issue 2: Build Fails on Vercel

### Symptoms
- Deployment fails
- Error in build logs
- Red X mark on deployment

### Solution
1. Go to Vercel dashboard
2. Click on the failed deployment
3. Click **"View Logs"**
4. Look for error message
5. Common fixes:
   - Check all environment variables are set
   - Verify MongoDB connection string
   - Check backend package.json has all dependencies

---

## Issue 3: Backend Health Check Returns Error

### Symptoms
- URL: `https://skill-sharing-platform-shivam.vercel.app/api/health`
- Returns error instead of JSON
- Shows "Cannot GET /api/health"

### Solution
1. Check Vercel deployment logs
2. Verify MONGO_URI environment variable is set
3. Verify MongoDB Atlas cluster is running
4. Verify MongoDB user was created (skilluser/skillpass123)
5. Test MongoDB connection string:
   - Go to MongoDB Atlas
   - Click "Connect"
   - Test connection with your credentials

---

## Issue 4: Login/Signup Fails

### Symptoms
- Click Sign Up, nothing happens
- Error message appears
- Network error in console

### Solution

#### Step 1: Check Browser Console
1. Open frontend URL
2. Press F12 (Developer Tools)
3. Go to **Console** tab
4. Look for error messages
5. Note the error

#### Step 2: Check Network Tab
1. Go to **Network** tab
2. Try to sign up
3. Look for failed requests
4. Click on failed request
5. Check Response tab for error message

#### Step 3: Verify Backend
1. Test health check first:
   ```
   https://skill-sharing-platform-shivam.vercel.app/api/health
   ```
2. If health check fails, backend is not running
3. If health check works, check API response

#### Step 4: Common Fixes
- Verify backend is deployed on Vercel
- Verify all environment variables are set
- Verify MongoDB connection works
- Check CORS configuration
- Verify CLIENT_URL matches frontend URL

---

## Issue 5: CORS Error

### Symptoms
- Error: "Access to XMLHttpRequest blocked by CORS policy"
- Frontend can't reach backend
- Network error in console

### Solution
1. Verify CLIENT_URL environment variable:
   - Should be: `https://shivamsingh10x.github.io/skill-sharing-platform-shivam`
   - Check for typos
   - Check for trailing slashes

2. Check backend CORS configuration in `api/index.js`:
   - Should include frontend URL
   - Should include localhost URLs for testing

3. Verify backend is responding:
   - Test health check endpoint
   - Check Vercel logs

---

## Issue 6: MongoDB Connection Error

### Symptoms
- Backend health check fails
- Error: "MongoDB connection error"
- Error: "Cannot connect to database"

### Solution

#### Step 1: Verify Connection String
1. Go to MongoDB Atlas
2. Click "Databases"
3. Click "Connect"
4. Select "Drivers"
5. Copy connection string
6. Verify format:
   ```
   mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere
   ```

#### Step 2: Verify MongoDB User
1. Go to MongoDB Atlas
2. Click "Database Access"
3. Verify user exists: `skilluser`
4. Verify password: `skillpass123`
5. If not, create new user

#### Step 3: Verify Network Access
1. Go to MongoDB Atlas
2. Click "Network Access"
3. Verify IP address is allowed
4. Should be: `0.0.0.0/0` (allow from anywhere)
5. If not, add it

#### Step 4: Verify Cluster is Running
1. Go to MongoDB Atlas
2. Click "Databases"
3. Verify cluster status is "Active"
4. If not, wait for it to start

---

## Issue 7: Frontend Shows Old Version

### Symptoms
- Frontend doesn't update after changes
- Old code still showing
- Changes not reflected

### Solution
1. Hard refresh browser:
   - Windows: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
2. Clear browser cache:
   - Open DevTools (F12)
   - Right-click refresh button
   - Select "Empty cache and hard refresh"
3. Wait 5 minutes for GitHub Pages to update

---

## Issue 8: Can't Push to GitHub

### Symptoms
- Error: "fatal: not a git repository"
- Can't commit changes
- Git commands not working

### Solution
1. Initialize git repository:
   ```bash
   git init
   ```

2. Add remote:
   ```bash
   git remote add origin https://github.com/shivamsingh10x/skill-sharing-platform-shivam.git
   ```

3. Add files:
   ```bash
   git add .
   ```

4. Commit:
   ```bash
   git commit -m "Update deployment"
   ```

5. Push:
   ```bash
   git push -u origin main
   ```

---

## Issue 9: Vercel Deployment Stuck

### Symptoms
- Deployment shows "Building..."
- Takes more than 10 minutes
- Doesn't complete

### Solution
1. Go to Vercel dashboard
2. Click on deployment
3. Click **"Cancel Deployment"**
4. Check build logs for errors
5. Fix errors
6. Redeploy

---

## Issue 10: Token Expired Error

### Symptoms
- Error: "Token expired"
- Need to login again
- Session lost

### Solution
- This is normal behavior
- JWT token expires after 7 days
- User needs to login again
- This is expected and secure

---

## Quick Diagnostic Checklist

When something doesn't work, check these in order:

1. **Frontend loads?**
   - [ ] Open frontend URL
   - [ ] Check for JavaScript errors (F12)
   - [ ] Check Network tab

2. **Backend responds?**
   - [ ] Test health check endpoint
   - [ ] Check Vercel logs
   - [ ] Check environment variables

3. **Database connected?**
   - [ ] Check MongoDB Atlas cluster status
   - [ ] Verify connection string
   - [ ] Verify user credentials

4. **API calls working?**
   - [ ] Check Network tab in DevTools
   - [ ] Look for error responses
   - [ ] Check CORS headers

5. **Authentication working?**
   - [ ] Can sign up?
   - [ ] Can login?
   - [ ] Token stored in localStorage?

---

## Getting Help

If you're stuck:

1. **Check the logs**
   - Browser console (F12)
   - Vercel deployment logs
   - MongoDB Atlas logs

2. **Read error messages carefully**
   - They usually tell you what's wrong
   - Search for the error online

3. **Try the basics**
   - Hard refresh browser
   - Clear cache
   - Restart browser

4. **Check configuration**
   - Verify all environment variables
   - Verify URLs are correct
   - Verify credentials are correct

5. **Test endpoints manually**
   - Use browser to test health check
   - Use Postman to test API endpoints
   - Verify responses

---

## Success Indicators

When everything is working:

✅ Frontend loads without errors
✅ Backend health check returns JSON
✅ Sign up creates user in MongoDB
✅ Login returns JWT token
✅ Dashboard shows after login
✅ Can view courses
✅ Can enroll in courses
✅ Can submit reviews
✅ Can get certificates

---

## Still Stuck?

1. Read DEPLOYMENT_CHECKLIST.md
2. Read VERCEL_DEPLOYMENT_STEPS.md
3. Check browser console for errors
4. Check Vercel logs
5. Verify all environment variables
6. Test health check endpoint
7. Try hard refresh (Ctrl+Shift+R)

**You've got this! 💪**
