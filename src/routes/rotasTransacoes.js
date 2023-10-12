const express = require("express");

const { validarRotasLogin } = require("../middleware/validarRotas");
const {
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  listarTransacoes,
  detalharTransacao,
} = require("../controllers/usuario/transacoesUsuario");
const { consultarExtrato } = require("../controllers/usuario/extratoUsuario");

const rotaTransacao = express();

rotaTransacao.use(validarRotasLogin);
rotaTransacao.post("/transacao", cadastrarTransacao);
rotaTransacao.put("/transacao/:id", atualizarTransacao);
rotaTransacao.delete("/transacao/:id", deletarTransacao);
rotaTransacao.get("/transacao", listarTransacoes);
rotaTransacao.get("/transacao/extrato", consultarExtrato);
rotaTransacao.get("/transacao/:id", detalharTransacao);

module.exports = rotaTransacao;
