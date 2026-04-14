require('dotenv').config({ path: './backend/.env' });
const mongoose = require('mongoose');

console.log('Testing MongoDB Atlas Connection...');
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Atlas Connected Successfully!');
  console.log('Database:', mongoose.connection.name);
  console.log('Host:', mongoose.connection.host);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Failed:', err.message);
  process.exit(1);
});
