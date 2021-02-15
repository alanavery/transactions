const express = require('express');

const User = require('../models/user');

// Routers ——————————————————————————————

const transactionsRouter = express.Router({ mergeParams: true });

// Routes ——————————————————————————————

transactionsRouter.get('/', (req, res) => {
  res.send(req.account.transactions);
});

module.exports = transactionsRouter;