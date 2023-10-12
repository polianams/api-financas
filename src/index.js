const express = require("express");
const rotaGeral = require("./routes/rotasGerais");
const rotaTransacao = require("./routes/rotasTransacoes");
const rotaUsuario = require("./routes/rotasUsuario");

const app = express();

app.use(express.json());
app.use(rotaGeral, rotaTransacao, rotaUsuario);

const porta = 3000;

app.listen(porta, () => {
  console.log(`O servidor está sendo executado na porta ${porta}.`);
});
