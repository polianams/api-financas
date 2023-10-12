const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const cadastrarUsuario = async (req, res) => {
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

module.exports = { cadastrarUsuario };
