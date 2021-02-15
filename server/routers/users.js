const express = require('express');

const User = require('../models/user');
const Account = require('../models/account');

const usersRouter = express.Router();

// Middleware ——————————————————————————————

usersRouter.param('userId', (req, res, next, id) => {
  User.findById(id, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send('The user cannot be found.');
      }
    }
  });
});

// Routes ——————————————————————————————

usersRouter.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
});

usersRouter.post('/', (req, res) => {
  const newUser = new User({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email
  });
  newUser.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(newUser);
    }
  });
});

usersRouter.get('/:userId/accounts', (req, res) => {
  res.send(req.user.accounts);
});

usersRouter.post('/:userId/accounts', (req, res) => {
  const newAccount = {
    name: req.body.name,
    balance: req.body.balance,
    credit: req.body.credit
  };
  const updatedAccounts = req.user.accounts.concat(newAccount);
  User.updateOne({ _id: req.user._id }, { accounts: updatedAccounts }, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});

module.exports = usersRouter;