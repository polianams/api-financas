const express = require('express');
const pool = require('./server');
const route = require('./routes/routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(route);

app.listen(port, () => {
  console.log(`O servidor está sendo executado na porta ${port}.`);
});