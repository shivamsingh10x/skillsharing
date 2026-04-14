# Deployment Checklist - skillsharing

## ✅ Completed
- [x] Code pushed to GitHub: https://github.com/shivamsingh10x/skillsharing
- [x] MongoDB Atlas connected with sample data
- [x] Enhanced dashboards created with animations
- [x] Chat box feature removed
- [x] Frontend configuration updated for GitHub Pages
- [x] Backend configuration updated for Render

## 📋 Next Steps

### 1. Deploy Backend to Render
- [ ] Go to https://render.com
- [ ] Sign in with GitHub
- [ ] Click "New +" → "Web Service"
- [ ] Select `skillsharing` repository
- [ ] Configure:
  - Name: `skillsharing-backend`
  - Environment: `Node`
  - Build Command: `npm install`
  - Start Command: `node backend/server.js`
  - Root Directory: `.`
- [ ] Add Environment Variables:
  ```
  PORT=5000
  MONGO_URI=mongodb+srv://skillsharing:Shivam%40123@cluster0.ynfaunh.mongodb.net/skillsphere?retryWrites=true&w=majority&serverSelectionTimeoutMS=10000&socketTimeoutMS=45000&maxPoolSize=10
  JWT_SECRET=skillsphere_super_secret_jwt_key_2024
  JWT_EXPIRE=7d
  NODE_ENV=production
  CLIENT_URL=https://shivamsingh10x.github.io/skillsharing
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (5-10 minutes)
- [ ] Note the backend URL: `https://skillsharing-backend.onrender.com`

### 2. Deploy Frontend to GitHub Pages
```bash
cd skill-sharing-platform
npm run deploy
```
- [ ] Frontend will be live at: https://shivamsingh10x.github.io/skillsharing

### 3. Test Deployment
- [ ] Visit frontend: https://shivamsingh10x.github.io/skillsharing
- [ ] Test backend health: https://skillsharing-backend.onrender.com/api/health
- [ ] Login with demo account:
  - Email: `mentor@skillsphere.com`
  - Password: `mentor123`
- [ ] Browse courses
- [ ] Check student/mentor dashboards
- [ ] Verify animations work

### 4. Monitor & Maintain
- [ ] Check Render logs for errors
- [ ] Monitor MongoDB Atlas usage
- [ ] Keep dependencies updated
- [ ] Regular backups of database

---

## 🔗 Important Links

- **GitHub Repository**: https://github.com/shivamsingh10x/skillsharing
- **Frontend URL**: https://shivamsingh10x.github.io/skillsharing
- **Backend URL**: https://skillsharing-backend.onrender.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Render Dashboard**: https://dashboard.render.com

---

## 📝 Demo Credentials

**Mentor Account:**
- Email: `mentor@skillsphere.com`
- Password: `mentor123`

**Student Account:**
- Email: `student@skillsphere.com`
- Password: `student123`

---

## 🆘 Troubleshooting

### Backend won't deploy
1. Check Render logs for errors
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Check if Node version is compatible

### Frontend can't connect to backend
1. Verify backend URL in `.env.production`
2. Check CORS settings in `backend/server.js`
3. Ensure backend is running on Render
4. Check browser console for errors

### MongoDB connection fails
1. Verify IP whitelist in MongoDB Atlas
2. Check connection string format
3. Ensure database `skillsphere` exists
4. Test connection locally first

---

## 📞 Support

For issues, check:
1. Render logs: https://dashboard.render.com
2. MongoDB Atlas logs: https://cloud.mongodb.com
3. Browser console (F12)
4. Network tab in DevTools
