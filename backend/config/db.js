const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });  // Load .env file if needed

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);  // Exit the process with a failure code
  }
};

module.exports = connectDB;
