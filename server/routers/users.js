const express = require('express');

const User = require('../models/user');

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

// Router ——————————————————————————————

const accountsRouter = require('./accounts');
usersRouter.use('/:userId/accounts', accountsRouter);

// Routes ——————————————————————————————

usersRouter.get('/', (req, res) => {
  User.find().populate({
    path: 'accounts',
    populate: {
      path: 'transactions',
      populate: { path: 'payee' }
    }
  }).exec((err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(users);
    }
  });
});

usersRouter.get('/:userId', (req, res) => {
  User.findById(req.user._id).populate({
    path: 'accounts',
    populate: {
      path: 'transactions',
      populate: { path: 'payee' }
    }
  }).exec((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(user);
    }
  });
});

usersRouter.post('/', (req, res) => {
  const newUser = new User({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email
  });
  newUser.save((err, createdUser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(createdUser);
    }
  });
});

usersRouter.put('/:userId', (req, res) => {
  req.user.first_name = req.body.firstName;
  req.user.last_name = req.body.lastName;
  req.user.email = req.body.email;
  req.user.save((err, updatedUser) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(updatedUser);
    }
  });
});

usersRouter.delete('/:userId', (req, res) => {
  User.deleteOne({ _id: req.user._id }, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(204).send();
    }
  });
});

module.exports = usersRouter;