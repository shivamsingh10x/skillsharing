# Vercel Deployment Checklist

## Before Deployment

- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created
- [ ] Database user created (username & password)
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] GitHub repository updated with latest code

## Vercel Setup

- [ ] Vercel account created (linked with GitHub)
- [ ] Project imported from GitHub
- [ ] Environment variables added:
  - [ ] `MONGO_URI` = Your MongoDB connection string
  - [ ] `JWT_SECRET` = Strong secret key
  - [ ] `JWT_EXPIRE` = `7d`
  - [ ] `NODE_ENV` = `production`
  - [ ] `CLIENT_URL` = Your GitHub Pages URL

- [ ] Deployment completed successfully
- [ ] Vercel domain copied (e.g., `https://your-project.vercel.app`)

## Frontend Update

- [ ] `.env.production` updated with Vercel domain
- [ ] Changes pushed to GitHub
- [ ] Frontend redeployed: `npm run deploy`

## Testing

- [ ] Visit GitHub Pages URL
- [ ] Try Sign Up with test email
- [ ] Try Login with test credentials
- [ ] Check browser console for errors (F12)
- [ ] Check Vercel logs if issues occur

## Common Issues & Fixes

### "Cannot POST /api/auth/register"
- Check if Vercel deployment completed
- Check if `MONGO_URI` is set in Vercel environment variables
- Check Vercel logs for errors

### "CORS error"
- Verify `CLIENT_URL` in Vercel environment variables
- Verify frontend URL matches `CLIENT_URL`

### "MongoDB connection failed"
- Verify connection string format
- Check if IP whitelist includes 0.0.0.0/0
- Check if database user credentials are correct

### "Token invalid or expired"
- Clear browser localStorage
- Try logging in again
- Check if `JWT_SECRET` is same in Vercel

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Pages: https://pages.github.com
