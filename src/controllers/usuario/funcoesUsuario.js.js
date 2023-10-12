const pool = require("../../conexao");
const bcrypt = require("bcrypt");

const detalharUsuario = async (req, res) => {
  try {
    const { rows: usuarioLogado } = await pool.query(
      `
        select id, nome, email from usuarios where id = $1
        `,
      [req.usuario.id]
    );

    return res.status(200).json(usuarioLogado);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: "Erro interno do servidor.",
    });
  }
};

const atualizarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(404)
      .json({ mensagem: "Todos os campos obrigatórios devem ser informados." });
  }

  try {
    const { rowCount } = await pool.query(
      `select * from usuarios where email = $1 and id != $2`,
      [email, req.usuario.id]
    );

    if (rowCount > 0) {
      return res.status(401).json({
        mensagem: "Já existe usuário cadastrado com o e-mail informado.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      `update usuarios set nome = $1, email = $2, senha = $3 where id = $4`,
      [nome, email, senhaCriptografada, req.usuario.id]
    );

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ mensagem: "Erro interno do servidor." });
  }
};

module.exports = {
  detalharUsuario,
  atualizarUsuario,
};
