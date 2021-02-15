const express = require('express');

const User = require('../models/user');

// Routers ——————————————————————————————

const usersRouter = express.Router();

const accountsRouter = require('./accounts');
usersRouter.use('/:userId/accounts', accountsRouter);

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

module.exports = usersRouter;