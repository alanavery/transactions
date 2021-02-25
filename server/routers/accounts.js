const express = require('express');

const accountsRouter = express.Router({ mergeParams: true });

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

// Router ——————————————————————————————

const transactionsRouter = require('./transactions');
accountsRouter.use('/:accountId/transactions', transactionsRouter);

// Routes ——————————————————————————————

accountsRouter.get('/', (req, res) => {
  res.send(req.user.accounts);
});

accountsRouter.get('/:accountId', (req, res) => {
  res.send(req.account);
});

accountsRouter.post('/', (req, res) => {
  const newAccount = {
    name: req.body.name,
    balance: req.body.balance,
    credit: req.body.credit
  };
  req.user.accounts.push(newAccount);
  req.user.save((err, updatedUser) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(updatedUser);
    }
  });
});

accountsRouter.put('/:accountId', (req, res) => {
  const account = req.user.accounts.id(req.account._id);
  account.name = req.body.name;
  account.balance = req.body.balance;
  account.credit = req.body.credit;
  req.user.save((err, updatedUser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(updatedUser);
    }
  });
});

accountsRouter.delete('/:accountId', (req, res) => {
  req.user.accounts.id(req.account._id).remove();
  req.user.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});

module.exports = accountsRouter;