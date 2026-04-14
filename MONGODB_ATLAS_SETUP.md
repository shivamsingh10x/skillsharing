# MongoDB Atlas Complete Setup Guide

## What is MongoDB Atlas?

MongoDB Atlas is a cloud database service that hosts MongoDB for you. It's free to start and perfect for development/testing.

---

## Step-by-Step Setup

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Fill in:
   - Email: Your email
   - Password: Strong password
   - First Name: Your name
   - Last Name: Your name
4. Check "I agree to the terms"
5. Click "Sign Up"
6. Verify your email (check inbox)

### Step 2: Create Organization & Project

1. After email verification, you'll see "Create an Organization"
2. Organization Name: `SkillSphere` (or any name)
3. Click "Create Organization"
4. Click "Create a Project"
5. Project Name: `skill-sharing-platform`
6. Click "Create Project"

### Step 3: Create Free Cluster

1. Click "Build a Cluster"
2. Select **M0 Free** tier (free forever)
3. Choose Cloud Provider: **AWS** (recommended)
4. Choose Region: Select closest to you
   - For India: `ap-south-1` (Mumbai)
   - For US: `us-east-1` (N. Virginia)
5. Click "Create Cluster"
6. **Wait 5-10 minutes** for cluster to be ready

### Step 4: Create Database User

1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Fill in:
   - **Username**: `skilluser`
   - **Password**: `skillpass123`
   - **Built-in Role**: Select `Atlas admin`
4. Click "Add User"
5. User created successfully ✅

### Step 5: Whitelist IP Address

1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Choose one option:
   - **For Development**: Enter `0.0.0.0/0` (allows all IPs)
   - **For Production**: Enter your server's IP address
4. Click "Confirm"
5. IP whitelisted ✅

### Step 6: Get Connection String

1. Go to "Clusters" in left sidebar
2. Click "Connect" button on your cluster
3. Select "Connect your application"
4. Choose:
   - **Driver**: Node.js
   - **Version**: 4.1 or later
5. Copy the connection string
6. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

### Step 7: Replace Placeholders

Replace in the connection string:
- `<username>` → `skilluser`
- `<password>` → `skillpass123`
- `<database>` → `skillsphere`

**Final Connection String**:
```
mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
```

---

## Use Connection String

### For Local Development

Update `backend/.env`:
```
MONGO_URI=mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority
```

### For Vercel Deployment

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add:
   - **Name**: `MONGO_URI`
   - **Value**: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`
5. Click "Save"
6. Redeploy

### For Render Deployment

1. Go to Render Dashboard
2. Select your service
3. Go to "Environment"
4. Add:
   - **Name**: `MONGO_URI`
   - **Value**: `mongodb+srv://skilluser:skillpass123@cluster0.xxxxx.mongodb.net/skillsphere?retryWrites=true&w=majority`
5. Click "Save"
6. Service will redeploy automatically

---

## Verify Connection

### Test Locally

1. Update `backend/.env` with connection string
2. Run:
   ```bash
   npm run dev
   ```
3. Check console for: `✅ MongoDB connected`

### Test on Vercel/Render

1. Visit: `https://your-backend-url.com/api/health`
2. Should return: `{ "status": "ok", "message": "SkillSphere API running", ... }`

---

## MongoDB Atlas Dashboard

### View Your Data

1. Go to "Clusters" → "Collections"
2. Select database: `skillsphere`
3. View all collections:
   - `users` - User accounts
   - `courses` - Course data
   - `reviews` - Course reviews
   - `certificates` - User certificates
   - `notifications` - User notifications
   - `progress` - Course progress

### Monitor Performance

1. Go to "Metrics" to see:
   - Database operations
   - Network traffic
   - Storage usage

### Backup & Restore

1. Go to "Backup" to:
   - View automatic backups
   - Create manual backups
   - Restore from backup

---

## Troubleshooting

### "Authentication failed"
- Check username/password are correct
- Verify user was created in "Database Access"
- Try resetting password

### "IP not whitelisted"
- Go to "Network Access"
- Verify `0.0.0.0/0` is added
- Wait a few minutes for changes to take effect

### "Connection timeout"
- Check internet connection
- Verify cluster is running (green status)
- Check firewall isn't blocking MongoDB

### "Database not found"
- Verify database name is `skillsphere` in connection string
- Database is created automatically on first write

---

## Security Best Practices

### For Development
- Use `0.0.0.0/0` for IP whitelist (allows all)
- Use simple password like `skillpass123`

### For Production
- Use strong password (20+ characters)
- Whitelist only your server's IP
- Use separate user for each application
- Enable IP Access List
- Enable encryption at rest
- Enable audit logging

---

## Free Tier Limits

- **Storage**: 512 MB
- **Connections**: 100 concurrent
- **Backup**: 7-day retention
- **Regions**: Limited selection

**Upgrade to paid** when you need:
- More storage (> 512 MB)
- More connections
- Dedicated hardware
- Advanced features

---

## Next Steps

1. ✅ Create MongoDB Atlas account
2. ✅ Create cluster
3. ✅ Create database user
4. ✅ Whitelist IP
5. ✅ Get connection string
6. ➡️ Use connection string in your deployment (Vercel/Render)
7. ➡️ Test your application

**You're ready to deploy!**
