# Skill Sharing Platform

A full-stack MERN (MongoDB, Express, React, Node.js) application for sharing and learning skills.

## Project Structure

```
skill-sharing-platform/
├── frontend/          # React frontend application
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/           # Node.js/Express backend API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── package.json       # Root package.json for scripts
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

### Install all dependencies

```bash
npm run install-all
```

Or manually:

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm install --prefix backend

# Install frontend dependencies
npm install --prefix frontend
```

## Environment Setup

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

Create a `.env` file in the `frontend/` directory:

```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run client
```

### Production Build

```bash
npm run build
```

## API Documentation

The backend API runs on `http://localhost:5000` by default.

### Key Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create a new course
- `GET /api/courses/:id` - Get course details

## Technologies Used

### Frontend
- React 18
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## License

MIT
