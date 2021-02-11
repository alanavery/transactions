const mongoose = require('mongoose');

const payerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const Payer = mongoose.model('Payer', payerSchema);

module.exports = Payer;