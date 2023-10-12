const pool = require("../../conexao");

const { errosGerais } = require("../../constants/errosMensagens");

const consultarExtrato = async (req, res) => {
  try {
    const somaEntradas = await pool.query(
      `select sum(valor) as "total_entrada" from transacoes where tipo = 'entrada' and usuario_id = $1`,
      [req.usuario.id]
    );

    const somaSaidas = await pool.query(
      `select sum(valor) as "total_saida" from transacoes where tipo = 'saida' and usuario_id = $1`,
      [req.usuario.id]
    );

    let entrada;
    let saida;

    if (somaEntradas.rows[0].total_entrada === null) {
      entrada = 0;
    } else {
      entrada = parseFloat(somaEntradas.rows[0].total_entrada);
    }

    if (somaSaidas.rows[0].total_saida === null) {
      saida = 0;
    } else {
      saida = parseFloat(somaSaidas.rows[0].total_saida);
    }
    const extrato = {
      entrada,
      saida,
    };

    return res.status(200).json(extrato);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = { consultarExtrato };
