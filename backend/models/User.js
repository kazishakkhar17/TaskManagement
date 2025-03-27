const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create a schema for User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],  // Email validation regex
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role: {
    type: String,
    default: 'user', // Default role is "user"
    enum: ['user', 'admin'],  //   : limit roles to only 'user' or 'admin'
  },
}, { timestamps: true });  //   : Adds `createdAt` and `updatedAt` fields

// Encrypt password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password with hash in the database
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
