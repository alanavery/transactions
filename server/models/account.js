const mongoose = require('mongoose');

const transactionSchema = require('./transaction');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    max: 1000000
  },
  credit: {
    type: Boolean,
    default: false
  },
  transactions: [transactionSchema],
});

module.exports = accountSchema;