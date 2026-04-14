# Render Deployment - Complete Setup Guide

## Step-by-Step Configuration

### 1. Source Code
- **Repository**: `shivamsingh10x/skillsharing`
- **Branch**: `main`
- Status: ✅ Already connected

---

### 2. Basic Settings

#### Name
```
skillsharing-backend
```

#### Language
```
Docker
```

#### Branch
```
main
```

#### Region
```
Ohio (US East)
```

#### Root Directory (Optional)
```
(leave empty - use root)
```

---

### 3. Build & Deploy

#### Build Command
```
npm install
```

#### Start Command
```
node backend/server.js
```

---

### 4. Instance Type
Select: **Starter** ($7/month)
- 512 MB RAM
- 0.5 CPU
- Good for development/testing

---

### 5. Environment Variables

Add these one by one by clicking "Add Environment Variable":

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGO_URI` | `mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10` |
| `JWT_SECRET` | `skillsphere_super_secret_jwt_key_2024` |
| `JWT_EXPIRE` | `7d` |
| `NODE_ENV` | `production` |
| `CLIENT_URL` | `https://shivamsingh10x.github.io/skillsharing` |

---

## Detailed Steps on Render Dashboard

### Step 1: Fill Name
- Field: "Name"
- Enter: `skillsharing-backend`

### Step 2: Select Language
- Field: "Language"
- Select: `Docker` (from dropdown)

### Step 3: Select Branch
- Field: "Branch"
- Select: `main` (from dropdown)

### Step 4: Select Region
- Field: "Region"
- Select: `Ohio (US East)` (from dropdown)

### Step 5: Leave Root Directory Empty
- Field: "Root Directory"
- Leave: Empty (optional field)

### Step 6: Build Command
- Field: "Build Command"
- Enter: `npm install`

### Step 7: Start Command
- Field: "Start Command"
- Enter: `node backend/server.js`

### Step 8: Select Instance Type
- Choose: **Starter** ($7/month)
  - 512 MB RAM
  - 0.5 CPU

### Step 9: Add Environment Variables
Click "Add Environment Variable" for each:

1. **First Variable**
   - Name: `PORT`
   - Value: `5000`
   - Click "Add"

2. **Second Variable**
   - Name: `MONGO_URI`
   - Value: `mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10`
   - Click "Add"

3. **Third Variable**
   - Name: `JWT_SECRET`
   - Value: `skillsphere_super_secret_jwt_key_2024`
   - Click "Add"

4. **Fourth Variable**
   - Name: `JWT_EXPIRE`
   - Value: `7d`
   - Click "Add"

5. **Fifth Variable**
   - Name: `NODE_ENV`
   - Value: `production`
   - Click "Add"

6. **Sixth Variable**
   - Name: `CLIENT_URL`
   - Value: `https://shivamsingh10x.github.io/skillsharing`
   - Click "Add"

### Step 10: Deploy
- Click "Deploy Web Service" button
- Wait 5-10 minutes for deployment
- You'll get a URL like: `https://skillsharing-backend.onrender.com`

---

## After Deployment

### Test Backend
```
https://skillsharing-backend.onrender.com/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "SkillSphere API running",
  "timestamp": "2026-04-14T..."
}
```

### Get Backend URL
- Copy the URL from Render dashboard
- It will be something like: `https://skillsharing-backend.onrender.com`

### Update Frontend
Once you have the backend URL, update `.env.production`:
```
REACT_APP_API_URL=https://skillsharing-backend.onrender.com/api
```

Then deploy frontend:
```bash
npm run deploy
```

---

## Troubleshooting

### Deployment Fails
1. Check "Logs" tab in Render dashboard
2. Look for error messages
3. Verify all environment variables are set
4. Ensure MongoDB connection string is correct

### Backend won't start
1. Check if `node backend/server.js` is correct
2. Verify PORT is set to 5000
3. Check MongoDB connection

### Can't connect from frontend
1. Verify `CLIENT_URL` is set correctly
2. Check CORS in `backend/server.js`
3. Ensure backend is running

---

## Important Notes

- ✅ Free tier available but may sleep after 15 minutes of inactivity
- ✅ Paid tier ($7/month) keeps service always running
- ✅ Logs are available in Render dashboard
- ✅ Can redeploy anytime by pushing to GitHub
- ✅ Environment variables are secure and not visible in code

---

## Next Steps After Backend Deployment

1. ✅ Backend deployed to Render
2. ⏳ Deploy frontend to GitHub Pages
3. ⏳ Test all features
4. ⏳ Monitor logs

---

## Frontend Deployment (After Backend)

```bash
cd skill-sharing-platform
npm run deploy
```

Frontend URL: `https://shivamsingh10x.github.io/skillsharing`

---

## Demo Credentials

**Mentor:**
- Email: `mentor@skillsphere.com`
- Password: `mentor123`

**Student:**
- Email: `student@skillsphere.com`
- Password: `student123`
