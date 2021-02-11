const mongoose = require('mongoose');

const Account = require('./account');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account.transactions'
  }]
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;