const express = require('express');

const Payee = require('../models/payee');

const payeesRouter = express.Router();

// Routes ——————————————————————————————

payeesRouter.get('/', (req, res) => {
  Payee.find({}, (err, payees) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(payees);
    }
  });
});

module.exports = payeesRouter;