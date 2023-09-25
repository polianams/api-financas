const express = require('express');
const pool = require('./conexao');
const rota = require('./rotas/rotas');

const app = express();
const porta = 3000;

app.use(express.json());
app.use(rota);

app.listen(porta, () => {
  console.log(`O servidor está sendo executado na porta ${porta}.`);
});