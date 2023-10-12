const pool = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaSecretaJwt = require("../../middleware/senhaJwt");

const { errosGerais, errosLogin } = require("../../constants/errosMensagens");

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(403).json({
        mensagem: errosGerais.camposObrigatorios,
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
        mensagem: errosLogin.loginInvalido,
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
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = { login };
