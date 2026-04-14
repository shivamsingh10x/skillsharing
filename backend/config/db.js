const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    console.log('URI:', process.env.MONGO_URI.substring(0, 50) + '...');
    
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      retryWrites: true,
      w: 'majority',
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 5,
    });
    
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
  } catch (err) {
    console.error(`❌ MongoDB connection error: ${err.message}`);
    console.error('💡 Make sure:');
    console.error('   1. Your IP is whitelisted in MongoDB Atlas Network Access');
    console.error('   2. Username and password are correct');
    console.error('   3. Cluster is running (green status in MongoDB Atlas)');
    console.error('   4. Internet connection is stable');
    process.exit(1);
  }
};

module.exports = connectDB;
