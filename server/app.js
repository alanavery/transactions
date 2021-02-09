const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Hello.');
});

app.listen(port, () => {
  console.log(`The Balance app is listening at http://localhost:${port}.`);
});
