const express = require("express");

const { validarRotasLogin } = require("../middleware/validarRotas");
const {
  listarCategorias,
} = require("../controllers/categorias/listarCategorias");
const {
  detalharUsuario,
  atualizarUsuario,
} = require("../controllers/usuario/funcoesUsuario.js");

const rotaUsuario = express();

rotaUsuario.use(validarRotasLogin);
rotaUsuario.get("/categoria", listarCategorias);
rotaUsuario.get("/usuario", detalharUsuario);
rotaUsuario.put("/usuario", atualizarUsuario);

module.exports = rotaUsuario;
