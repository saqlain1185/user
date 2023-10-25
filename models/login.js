const mongoose = require('mongoose');
const { isEmail, isIn } = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: isEmail,
      message: 'Invalid email address',
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Minimum password length
  },

  
  resetPasswordToken: {
    type: String,
    default: null,
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
  }
});

module.exports = mongoose.model('LoginTesting', userSchema);