const pool = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSecretaJwt = require("../../middleware/senhaJwt");

const cadastroUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    if (!nome || !email || !senha) {
      return res.status(404).json({
        mensagem: "Todos os campos obrigatórios devem ser informados.",
      });
    }

    const { rowCount } = await pool.query(
      `select * from usuarios where email = $1`,
      [email]
    );

    if (rowCount > 0) {
      return res.status(401).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const { rows } = await pool.query(
      `insert into usuarios (nome, email, senha) values ($1, $2, $3) returning *`,
      [nome, email, senhaCriptografada]
    );

    const { senha: _, ...usuario } = rows[0];

    return res.status(201).json(usuario);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: "Erro interno do servidor",
    });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(403).json({
        mensagem: "Todos os campos obrigatórios devem ser informados.",
      });
    }

    const { rows, rowCount } = await pool.query(
      `select * from usuarios where email = $1`,
      [email]
    );

    if (rowCount < 0) {
      return res.status(401).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }

    const { senha: senhaDoUsuario, ...usuario } = rows[0];

    const senhaValida = await bcrypt.compare(senha, senhaDoUsuario);

    if (!senhaValida) {
      return res.status(401).json({
        mensagem: "Usuário e/ou senha inválido(s).",
      });
    }

    const token = jwt.sign({ id: usuario.id }, senhaSecretaJwt, {
      expiresIn: "8h",
    });

    return res.status(201).json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: "Erro interno do servidor.",
    });
  }
};

module.exports = {
  cadastroUsuario,
  login,
};
