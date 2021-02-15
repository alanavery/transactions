const express = require('express');

const User = require('../models/user');

// Routers ——————————————————————————————

const accountsRouter = express.Router({ mergeParams: true });

const transactionsRouter = require('./transactions');
accountsRouter.use('/:accountId/transactions', transactionsRouter);

// Middleware ——————————————————————————————

accountsRouter.param('accountId', (req, res, next, id) => {
  const account = req.user.accounts.id(id);
  if (account) {
    req.account = account;
    next();
  } else {
    res.status(404).send('The account cannot be found.');
  }
});

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