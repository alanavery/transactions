const mongoose = require('mongoose');

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
  payee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payee'
  },
  payer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payer'
  },
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

module.exports = transactionSchema;