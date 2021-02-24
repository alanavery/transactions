const express = require('express');

const Payee = require('../models/payee');

const transactionsRouter = express.Router({ mergeParams: true });

// Middleware ——————————————————————————————

const createPayee = (req, res, next) => {
  if (req.body.payee) {
    Payee.findOne({ name: req.body.payee }, (err, payee) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (payee) {
          req.payee = payee;
          next();
        } else {
          const newPayee = new Payee({ name: req.body.payee });
          newPayee.save((err, createdPayee) => {
            if (err) {
              res.status(500).send(err);
            } else {
              req.payee = createdPayee;
              next();
            }
          });
        }
      }
    });
  }
};

transactionsRouter.param('transactionId', (req, res, next, id) => {
  const transaction = req.user.accounts.id(req.account._id).transactions.id(id);
  if (transaction) {
    req.transaction = transaction;
    next();
  } else {
    res.status(400).send('The transaction cannot be found.');
  }
});

// Routes ——————————————————————————————

// transactionsRouter.get('/', (req, res) => {
//   res.send(req.account.transactions);
// });

transactionsRouter.post('/', createPayee, (req, res) => {
  const newTransaction = {
    type: req.body.type,
    amount: req.body.amount,
    payee: req.payee._id,
    date: req.body.date,
    cleared: req.body.cleared,
  };
  req.user.accounts.id(req.account._id).transactions.push(newTransaction);
  req.user.save((err, updatedUser) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(updatedUser);
    }
  });
});

transactionsRouter.get('/:transactionId', (req, res) => {
  res.send(req.transaction);
});

transactionsRouter.put('/:transactionId', (req, res) => {
  req.user.accounts.id(req.account._id).transactions.id(req.transaction._id).cleared = req.body.cleared;
  req.user.save((err, updatedUser) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(updatedUser);
    }
  });
});

module.exports = transactionsRouter;