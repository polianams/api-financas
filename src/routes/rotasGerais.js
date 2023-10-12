const express = require("express");

const { cadastrarUsuario } = require("../controllers/usuario/cadastroUsuario");
const { login } = require("../controllers/usuario/loginUsuario");

const rotaGeral = express();

rotaGeral.post("/usuario", cadastrarUsuario);
rotaGeral.post("/login", login);

module.exports = rotaGeral;
