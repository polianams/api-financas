const express = require('express');
const { criarUsuario, login } = require('../controladores/usuario');
const validarRotas = require('../intermediarios/validarRota');
const { detalharUsuario, atualizarUsuario, listarCategoria } = require('../controladores/usuarioLogado');
const { cadastrarTransacao, atualizarTransacao, deletarTransacao, listarTransacoes, detalharTransacao, consultarExtrato } = require('../controladores/transacoes');

const rota = express();

rota.post('/usuario', criarUsuario);
rota.post('/login', login);

rota.use(validarRotas);
rota.get('/usuario', detalharUsuario);
rota.put('/usuario', atualizarUsuario);
rota.get('/categoria', listarCategoria);
rota.post('/transacao', cadastrarTransacao);
rota.put('/transacao/:id', atualizarTransacao);
rota.delete('/transacao/:id', deletarTransacao);
rota.get('/transacao', listarTransacoes);
rota.get('/transacao/extrato', consultarExtrato);
rota.get('/transacao/:id', detalharTransacao);

module.exports = rota;