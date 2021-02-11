const express = require('express');
const app = express();

// const fruits = require('./testData');
const User = require('./models/user');
const Account = require('./models/account');

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

app.get('/', (req, res) => {
  res.send('Hello.');
});

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
      res.send(`Unable to find users.\n${err}`);
    } else {
      res.send(users);
    }
  });
});

app.post('/users/:userId/accounts', (req, res) => {
  User.exists({ _id: req.params.userId }, (err, result) => {
    if (err) {
      res.send(`Unable to find user.\n${err}`);
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
      }
    }
  });
});

// Listen for requests ——————————————————————————————

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}.`);
});
