const pool = require("../../conexao");

const { errosGerais } = require("../../constants/errosMensagens");

const listarCategorias = async (req, res) => {
  try {
    const categorias = await pool.query(`select * from categorias`);

    return res.json(categorias.rows);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ mensagem: errosGerais.erroServidor });
  }
};

module.exports = {
  listarCategorias,
};
