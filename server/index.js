const express = require('express');
const app = express();
const morgan = require('morgan');

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
app.use(morgan('dev'));

// Response headers ——————————————————————————————

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routers ——————————————————————————————

const usersRouter = require('./routers/users');
app.use('/users', usersRouter);

const payeesRouter = require('./routers/payees');
app.use('/payees', payeesRouter);

// Listen for requests ——————————————————————————————

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`The server is listening at http://localhost:${port}.`);
});
