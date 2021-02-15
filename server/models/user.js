const mongoose = require('mongoose');

const accountSchema = require('./account');

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  accounts: [accountSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
