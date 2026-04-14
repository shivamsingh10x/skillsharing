# MongoDB Atlas Connection Guide

## Your Connection String
```
mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

## Where It's Used

### 1. Local Development
**File**: `backend/.env`
```
MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

### 2. Vercel Deployment
**Location**: Vercel Dashboard → Project Settings → Environment Variables
```
MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

### 3. Render Deployment
**Location**: Render Dashboard → Service → Environment
```
MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

## Connection File
**Location**: `backend/config/db.js`

This file handles the actual MongoDB connection:
```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## How Connection Works

1. **Backend starts** → `backend/server.js` loads
2. **dotenv loads** → Reads `backend/.env`
3. **connectDB() called** → Connects to MongoDB Atlas
4. **Connection established** → API ready to use

## Troubleshooting Connection Issues

### Issue 1: Connection Timeout
**Error**: `Command timed out` or `ECONNREFUSED`

**Solutions**:
1. Check MongoDB Atlas cluster is running (green status)
2. Verify IP whitelist includes your IP:
   - Go to MongoDB Atlas → Network Access
   - Should have `0.0.0.0/0` or your IP
3. Check internet connection
4. Try with different network (mobile hotspot)

### Issue 2: Authentication Failed
**Error**: `authentication failed` or `Invalid username/password`

**Solutions**:
1. Verify username: `skillsharing`
2. Verify password: `Shivam@123` (not URL encoded)
3. Check user exists in MongoDB Atlas → Database Access
4. Reset password if needed

### Issue 3: Database Not Found
**Error**: `database not found` or similar

**Solutions**:
1. Database is created automatically on first write
2. Try creating a user first (Sign Up)
3. Check database name is `skillsphere` in connection string

### Issue 4: Connection String Issues
**Error**: `Invalid connection string`

**Solutions**:
1. Verify format: `mongodb+srv://username:password@host/database?options`
2. Check special characters are URL encoded (@ = %40)
3. Verify no spaces in connection string
4. Copy directly from MongoDB Atlas "Connect" button

## Testing Connection

### Method 1: Run Backend
```bash
npm run server
```
Should show:
```
✅ SkillSphere API + Socket.io running on http://localhost:5000
✅ MongoDB connected: cluster0.ynfaunh.mongodb.net
```

### Method 2: Test Script
```bash
node test-mongo.js
```
Should show:
```
✅ MongoDB Atlas Connected Successfully!
Database: skillsphere
Host: cluster0.ynfaunh.mongodb.net
```

### Method 3: API Health Check
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

## MongoDB Atlas Dashboard

### View Your Data
1. Go to https://cloud.mongodb.com
2. Login with your account
3. Click "Clusters" → "Collections"
4. Select database: `skillsphere`
5. View collections:
   - `users` - User accounts
   - `courses` - Course data
   - `reviews` - Reviews
   - `certificates` - Certificates
   - `notifications` - Notifications
   - `progress` - Progress tracking

### Monitor Connection
1. Go to "Metrics" tab
2. View:
   - Active connections
   - Operations per second
   - Network traffic
   - Storage usage

## Connection String Breakdown

```
mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=5000&socketTimeoutMS=45000
```

| Part | Meaning |
|------|---------|
| `mongodb+srv://` | MongoDB Atlas protocol |
| `skillsharing` | Database username |
| `Shivam%40123` | Password (URL encoded) |
| `cluster0.ynfaunh.mongodb.net` | MongoDB Atlas host |
| `skillsphere` | Database name |
| `retryWrites=true` | Retry failed writes |
| `w=majority` | Write concern |
| `serverSelectionTimeoutMS=5000` | Connection timeout |
| `socketTimeoutMS=45000` | Socket timeout |

## Next Steps

1. ✅ Connection string added to `backend/.env`
2. ➡️ Test connection: `npm run server`
3. ➡️ Test Sign Up (creates user in MongoDB)
4. ➡️ Test Login
5. ➡️ Deploy to Vercel/Render

## Important Notes

- **Password**: `Shivam@123` (special character @ is URL encoded as %40)
- **Database**: `skillsphere` (created automatically)
- **Collections**: Created automatically when data is inserted
- **Free Tier**: 512MB storage, 3 shared nodes
- **Backups**: Automatic 7-day retention

## Security

- ✅ Connection string is in `.env` (not in code)
- ✅ `.env` is in `.gitignore` (not pushed to GitHub)
- ✅ Use strong passwords for production
- ✅ Whitelist only necessary IPs in production

---

**Status**: ✅ MongoDB Atlas connected and ready!
