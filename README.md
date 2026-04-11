# Skill Sharing Platform

A modern full-stack application for skill sharing, built with React, Tailwind CSS, Node.js, and MongoDB.

## Features

- User authentication (students and mentors)
- Course browsing and search
- Course enrollment
- Mentor dashboard for course management
- Student dashboard with progress tracking
- Certificate generation
- Responsive design with Tailwind CSS
- Real-time notifications

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, JWT
- **Deployment**: Vercel + GitHub Pages

## Getting Started Locally

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/skill-sharing-platform-new.git
   cd skill-sharing-platform
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. Create `.env` file in root:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

5. Create `.env` file in `backend/`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/skillsphere
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

6. Start MongoDB locally or use MongoDB Atlas

7. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```

8. In a new terminal, start the frontend:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Deployment on Vercel + GitHub

### Step 1: MongoDB Atlas Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Add a database user (username & password)
4. Whitelist IP: 0.0.0.0/0
5. Copy connection string: `mongodb+srv://user:password@cluster.mongodb.net/skillsphere`

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Vercel deployment ready"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skill-sharing-platform-new.git
git push -u origin main
```

### Step 3: Deploy on Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret key
   - `JWT_EXPIRE`: `7d`
   - `NODE_ENV`: `production`
   - `CLIENT_URL`: Your GitHub Pages URL

6. Click "Deploy"

### Step 4: Update Frontend URL

1. Update `.env.production`:
   ```
   REACT_APP_API_URL=https://your-vercel-domain.vercel.app/api
   ```

2. Push changes:
   ```bash
   git add .env.production
   git commit -m "Update Vercel backend URL"
   git push origin main
   ```

3. Deploy frontend:
   ```bash
   npm run deploy
   ```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to GitHub Pages
- `npm run dev` - Run frontend + backend concurrently
- `npm run server` - Run backend only

## Project Structure

```
skill-sharing-platform/
├── public/              # Static files
├── src/                 # React frontend
│   ├── api/            # API services
│   ├── components/     # React components
│   ├── context/        # Context providers
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   └── App.js          # Main app
├── backend/            # Node.js backend
│   ├── config/         # Database config
│   ├── controllers/    # Route controllers
│   ├── middleware/     # Express middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   └── server.js       # Server entry
├── api/                # Vercel serverless functions
├── vercel.json         # Vercel configuration
└── package.json        # Dependencies
```

## Testing

### Sign Up
1. Go to Register page
2. Enter name, email, password
3. Select role (student/mentor)
4. Click Sign Up

### Login
1. Go to Login page
2. Enter email and password
3. Click Login

### Browse Courses
1. Go to Courses page
2. View available courses
3. Click on course to see details
4. Enroll in course

## Troubleshooting

### Backend not responding
- Check if MongoDB is running
- Verify `MONGO_URI` in `.env`
- Check backend logs: `npm run server`

### Login/Signup not working
- Check browser console (F12)
- Verify `REACT_APP_API_URL` in `.env`
- Check network tab for API errors

### CORS errors
- Verify `CLIENT_URL` in backend `.env`
- Check if frontend URL matches `CLIENT_URL`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License

ISC

## Support

For issues and questions, please open an issue on GitHub.
