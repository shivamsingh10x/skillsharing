# MongoDB Atlas Troubleshooting - Complete Guide

## Current Error
```
❌ MongoDB connection error: Could not connect to any servers in your MongoDB Atlas cluster.
```

## Verification Checklist

### ✅ Step 1: Verify Cluster is Running
1. Go to https://cloud.mongodb.com
2. Login with your account
3. Click "Clusters" in left sidebar
4. Look for "cluster0"
5. **Status should be GREEN** (not red/yellow)
6. If not green, wait for it to start

### ✅ Step 2: Verify IP Whitelist
1. Go to https://cloud.mongodb.com
2. Click "Network Access" in left sidebar
3. Look for your IP in the list
4. **Should show `0.0.0.0/0`** (allows all IPs)
5. **Status should be GREEN** with checkmark
6. If not there, click "Add IP Address" → "Allow Access from Anywhere" → "Confirm"

### ✅ Step 3: Verify Database User
1. Go to https://cloud.mongodb.com
2. Click "Database Access" in left sidebar
3. Look for user "skillsharing"
4. **Status should be GREEN** with checkmark
5. If not there, click "Add New Database User":
   - Username: `skillsharing`
   - Password: `Shivam@123`
   - Role: `Atlas admin`
   - Click "Add User"

### ✅ Step 4: Verify Connection String
1. Go to "Clusters" → Click "Connect"
2. Select "Connect your application"
3. Copy the connection string
4. Should look like:
   ```
   mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority
   ```
5. Verify in `backend/.env`:
   ```
   MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10
   ```

---

## Common Issues & Solutions

### Issue 1: IP Not Whitelisted
**Error**: `Could not connect to any servers`

**Fix**:
1. Go to Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"
5. Wait 1-2 minutes
6. Try again

### Issue 2: Wrong Username/Password
**Error**: `authentication failed`

**Fix**:
1. Go to Database Access
2. Check username is `skillsharing`
3. If password wrong, click "Edit" → "Update Password"
4. Set to `Shivam@123`
5. Click "Update User"

### Issue 3: Cluster Not Running
**Error**: `Could not connect to any servers`

**Fix**:
1. Go to Clusters
2. If cluster is red/yellow, click it
3. Wait for it to start (5-10 minutes)
4. Status should turn green

### Issue 4: Wrong Database Name
**Error**: `database not found` or connection hangs

**Fix**:
1. Check `backend/.env` MONGO_URI
2. Database name should be `skillsphere`
3. Not `rajsingh` or any other name
4. Update if needed

### Issue 5: Connection Timeout
**Error**: `Command timed out` or hangs

**Fix**:
1. Check internet connection
2. Try different network (mobile hotspot)
3. Increase timeout in connection string:
   ```
   serverSelectionTimeoutMS=10000&socketTimeoutMS=45000
   ```

---

## Step-by-Step Verification

### 1. Check Cluster Status
```
MongoDB Atlas Dashboard
├── Clusters
│   └── cluster0
│       └── Status: GREEN ✅
```

### 2. Check Network Access
```
MongoDB Atlas Dashboard
├── Network Access
│   └── IP Whitelist
│       └── 0.0.0.0/0 (GREEN ✅)
```

### 3. Check Database User
```
MongoDB Atlas Dashboard
├── Database Access
│   └── skillsharing (GREEN ✅)
```

### 4. Check Connection String
```
backend/.env
├── MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?...
```

---

## Current Configuration

### Your Connection Details
- **Username**: `skillsharing`
- **Password**: `Shivam@123` (URL encoded: `Shivam%40123`)
- **Cluster**: `cluster0.ynfaunh.mongodb.net`
- **Database**: `skillsphere`
- **Connection String**:
  ```
  mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10
  ```

---

## Testing Connection

### Test 1: Run Backend
```bash
npm run server
```

Should show:
```
🔄 Attempting to connect to MongoDB Atlas...
✅ MongoDB connected: cluster0.ynfaunh.mongodb.net
📊 Database: skillsphere
```

### Test 2: Run Full Stack
```bash
npm run dev
```

Should show:
```
[BACKEND] ✅ SkillSphere API + Socket.io running on http://localhost:5000
[BACKEND] ✅ MongoDB connected: cluster0.ynfaunh.mongodb.net
[FRONTEND] Compiled successfully!
```

### Test 3: Test API
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "ok",
  "message": "SkillSphere API running",
  "timestamp": "2024-04-14T..."
}
```

---

## MongoDB Atlas Dashboard Checklist

- [ ] Cluster status is GREEN
- [ ] IP whitelist includes `0.0.0.0/0` (GREEN)
- [ ] Database user `skillsharing` exists (GREEN)
- [ ] Connection string matches `backend/.env`
- [ ] Database name is `skillsphere`
- [ ] No typos in username/password

---

## If Still Not Working

1. **Check all items in checklist above**
2. **Try different network** (mobile hotspot)
3. **Restart MongoDB cluster**:
   - Go to Clusters
   - Click cluster name
   - Click "Pause" then "Resume"
4. **Check MongoDB Atlas status**: https://status.mongodb.com
5. **Contact MongoDB support** if cluster is down

---

## Next Steps

1. ✅ Verify all checklist items
2. ✅ Fix any issues found
3. ✅ Run `npm run dev`
4. ✅ Test Sign Up/Login
5. ✅ Deploy to Vercel/Render

---

**After fixing, run: `npm run dev`**
