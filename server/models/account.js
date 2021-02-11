const mongoose = require('mongoose');

const User = require('./user');
const Payee = require('./payee');
const Payer = require('./payer');
const Tag = require('./tag');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'debit',
  },
  amount: {
    type: Number,
    required: true,
    max: 1000000
  },
  payee: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payee'
  }],
  payer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payer'
  }],
  date: {
    type: Date,
    default: Date.now
  },
  cleared: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

const accountSchema = new mongoose.Schema({
  user: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;