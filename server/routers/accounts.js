const express = require('express');

const User = require('../models/user');

// Routers ——————————————————————————————

const accountsRouter = express.Router({ mergeParams: true });

// Routes ——————————————————————————————

accountsRouter.get('/', (req, res) => {
  res.send(req.user.accounts);
});

accountsRouter.post('/', (req, res) => {
  const newAccount = {
    name: req.body.name,
    balance: req.body.balance,
    credit: req.body.credit
  };
  const updatedAccounts = req.user.accounts.concat(newAccount);
  User.updateOne({ _id: req.user._id }, { accounts: updatedAccounts }, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(newAccount);
    }
  });
});

module.exports = accountsRouter;