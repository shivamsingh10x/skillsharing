# Fix MongoDB Atlas IP Whitelist Error

## Error Message
```
❌ MongoDB connection error: Could not connect to any servers in your MongoDB Atlas cluster. 
One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Add Your IP to MongoDB Atlas

### Step 1: Go to MongoDB Atlas
1. Visit https://cloud.mongodb.com
2. Login with your account
3. Click on your cluster (should show "cluster0")

### Step 2: Go to Network Access
1. In left sidebar, click **"Network Access"**
2. You should see a list of whitelisted IPs

### Step 3: Add Your IP
1. Click **"Add IP Address"** button
2. Choose one option:

#### Option A: Allow All IPs (For Development)
1. Click "Add IP Address"
2. In the dialog, click **"Allow Access from Anywhere"**
3. This adds `0.0.0.0/0` (allows all IPs)
4. Click "Confirm"

#### Option B: Add Your Current IP (More Secure)
1. Click "Add IP Address"
2. Click "Add Current IP Address"
3. Your current IP will be auto-filled
4. Click "Confirm"

### Step 4: Wait for Changes
- Changes take 1-2 minutes to propagate
- You'll see a green checkmark when active

### Step 5: Test Connection
```bash
npm run dev
```

Should now show:
```
✅ SkillSphere API + Socket.io running on http://localhost:5000
✅ MongoDB connected: cluster0.ynfaunh.mongodb.net
```

---

## Why This Error Happens

MongoDB Atlas has security restrictions:
- By default, NO IPs can connect
- You must explicitly whitelist IPs
- This prevents unauthorized access

## For Different Scenarios

### Local Development
- Add `0.0.0.0/0` (allows all IPs)
- OR add your home IP

### Vercel Deployment
- Add `0.0.0.0/0` (Vercel uses many IPs)
- OR contact Vercel for their IP ranges

### Render Deployment
- Add `0.0.0.0/0` (Render uses many IPs)
- OR contact Render for their IP ranges

### Production
- Add only your server's IP
- More secure but requires static IP

---

## Quick Steps

1. Go to https://cloud.mongodb.com
2. Login
3. Click "Network Access" in left sidebar
4. Click "Add IP Address"
5. Click "Allow Access from Anywhere"
6. Click "Confirm"
7. Wait 1-2 minutes
8. Run `npm run dev`

---

## Still Not Working?

### Check 1: Verify IP is Active
- Go to Network Access
- Look for green checkmark next to your IP
- If red, wait a bit longer

### Check 2: Verify Connection String
- Check `backend/.env` has correct MONGO_URI
- Verify username: `skillsharing`
- Verify password: `Shivam@123`

### Check 3: Check Cluster Status
- Go to "Clusters"
- Cluster should show green status
- If red/yellow, cluster is not ready

### Check 4: Try Different Network
- Try mobile hotspot
- Try different WiFi
- Try wired connection

---

## After Fixing

Once IP is whitelisted:
1. Backend will connect to MongoDB Atlas
2. Frontend will load
3. You can test Sign Up/Login
4. Data will be saved in MongoDB Atlas

---

**Next**: After fixing IP whitelist, run `npm run dev` again!
