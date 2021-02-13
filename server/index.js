const express = require('express');
const app = express();

const User = require('./models/user');
const Account = require('./models/account');
const Payee = require('./models/payee');
const Payer = require('./models/payer');
const Tag = require('./models/tag');

// Mongoose ——————————————————————————————

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (err) => console.log(`Connection error:`));
db.once('open', () => console.log(`Connected to database at ${db.host}:${db.port}.`));

// Middleware ——————————————————————————————

app.use(express.json());

// Response headers ——————————————————————————————

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes ——————————————————————————————

app.post('/users', (req, res) => {
  const newUser = new User({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email
  });
  newUser.save((err) => {
    if (err) {
      res.send(`A new user has NOT been added to the database.\n${err}`);
    } else {
      res.send('A new user has been added to the database.');
    }
  });
});

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.send(`There was an error searching the database.\n${err}`);
    } else {
      res.send(users);
    }
  });
});

app.post('/users/:userId/accounts', (req, res) => {
  User.exists({ _id: req.params.userId }, (err, result) => {
    if (err) {
      res.send(`There was an error searching the database.\n${err}`);
    } else {
      if (result) {
        const newAccount = new Account({
          user: req.params.userId,
          name: req.body.name,
          balance: req.body.balance,
          credit: req.body.credit
        });
        newAccount.save((err, account) => {
          if (err) {
            res.send(`A new account has NOT been added to the database.\n${err}`);
          } else {
            res.send(`A new account has been added to the database.\n${account}`);
          }
        });
      } else {
        res.send('The user doesn\'t exist.');
      }
    }
  });
});

app.get('/users/:userId/accounts', (req, res) => {
  User.exists({ _id: req.params.userId }, (err, result) => {
    if (err) {
      res.send(`There was an error searching the database.\n${err}`);
    } else {
      if (result) {
        Account.find({ user: req.params.userId }, (err, accounts) => {
          if (err) {
            res.send(`There was an error searching the database.\n${err}`);
          } else {
            res.send(accounts);
          }
        });
      } else {
        res.send('The user doesn\'t exist.');
      }
    }
  });
});

app.post('/users/:userId/accounts/:accountId/transactions', (req, res) => {
  User.exists({ _id: req.params.userId }, (err, result) => {
    if (err) {
      res.send(`There was an error searching the database.\n${err}`);
    } else {
      if (result) {
        Account.findOne({ _id: req.params.accountId }, async (err, account) => {
          if (err) {
            res.send(`There was an error searching the database.\n${err}`);
          } else {
            if (account === null) {
              res.send('The account doesn\'t exist.');
            } else {
              const newTransaction = {
                type: req.body.type,
                amount: req.body.amount,
                date: req.body.date,
                cleared: req.body.cleared
              };
              if (req.body.payee) {
                await Payee.findOne({ name: req.body.payee }, (err, result) => {
                  if (err) {
                    res.send(`There was an error searching the database.\n${err}`);
                  } else {
                    if (result === null) {
                      Payee.create({ name: req.body.payee }, (err, payee) => {
                        if (err) {
                          res.send(`There was an error searching the database.\n${err}`);
                        } else {
                          newTransaction.payee = payee._id;
                        }
                      });
                    } else {
                      newTransaction.payee = result._id;
                    }
                  }
                });
              }
              const transactions = account.transactions;
              transactions.push(newTransaction);
              Account.findOneAndUpdate({ _id: req.params.accountId }, { transactions: transactions }, (err, account) => {
                if (err) {
                  res.send(`There was an error searching the database.\n${err}`);
                } else {
                  res.send(account);
                }
              });

            }
          }
        });
      } else {
        res.send('The user doesn\'t exist.');
      }
    }
  });
});

// Listen for requests ——————————————————————————————

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}.`);
});
