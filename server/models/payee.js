const mongoose = require('mongoose');

const payeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Payee = mongoose.model('Payee', payeeSchema);

module.exports = Payee;