#!/bin/bash

# Vercel deployment script
# This will deploy the full stack to Vercel

echo "🚀 Starting Vercel deployment..."

# Install Vercel CLI globally if not already installed
npm install -g vercel

# Deploy to Vercel with environment variables
vercel --prod \
  --env MONGO_URI="mongodb+srv://skilluser:skillpass123@skillcluster.mongodb.net/skillsphere" \
  --env JWT_SECRET="skillsphere_super_secret_jwt_key_2024" \
  --env JWT_EXPIRE="7d" \
  --env NODE_ENV="production" \
  --env CLIENT_URL="https://shivamsingh10x.github.io/skill-sharing-platform-shivam"

echo "✅ Deployment complete!"
