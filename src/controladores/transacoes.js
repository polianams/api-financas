const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(404).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
  };

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.status(400).json({
      mensagem: 'O campo tipo deve ser exatamente entrada ou saida.'
    });
  }

  try {
    const { rows, rowCount } = await pool.query(`select * from categorias where id = $1`, [categoria_id]);

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: 'A categoria especificada não existe.'
      });
    };

    await pool.query(`insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *`, [descricao, valor, data, categoria_id, req.usuario.id, tipo]);

    const transacaoCadastrada = {
      tipo,
      descricao,
      valor,
      data,
      usuario_id: req.usuario.id,
      categoria_id,
      categoria_nome: rows[0].descricao,
    };

    return res.status(200).json(transacaoCadastrada);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  };
};

const atualizarTransacao = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  try {
    const verificarTransacao = await pool.query(
      `select * from transacoes where id = $1 and usuario_id = $2`,
      [id, req.usuario.id]
    );

    if (verificarTransacao.rows.length < 1) {
      return res.status(400).json({
        mensagem: 'A transação especificada não existe ou não pertence ao usuário logado.'
      });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({
        mensagem: 'Todos os campos obrigatórios devem ser informados.'
      });
    };

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({
        mensagem: 'O campo tipo deve ser exatamente entrada ou saida.'
      });
    }

    const { rowCount } = await pool.query(
      `select * from categorias where id = $1`,
      [categoria_id]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: 'A categoria especificada não existe.'
      });
    };

    await pool.query(
      `update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6`,
      [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(204).send();

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  }
}

const deletarTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(`
    select * from transacoes where id = $1 and usuario_id = $2`,
      [id, req.usuario.id]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: 'Transação não encontrada ou não pertence ao usuário.'
      });
    };

    await pool.query(
      `delete from transacoes where id = $1`, [id]);

    return res.status(204).send();

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  };
};

const listarTransacoes = async (req, res) => {
  const { filtro } = req.query;
  const filtroArray = filtro ?? [];

  try {

    const { rows, rowCount } = await pool.query(
      `select t.id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes as t join categorias as c on t.categoria_id = c.id where t.usuario_id = $1`,
      [req.usuario.id]
    );

    let resultado = [];

    if ( filtroArray.length > 0 ){
      for ( let i = 0; i < filtroArray.length; i++) {
        for ( let j = 0; j < rowCount; j++) {
          if ( rows[j].categoria_nome === filtro[i] ) {
            resultado.push(rows[j]);
          };
        };
      };
    } else {
      resultado = rows;
    };

    return res.status(200).json(resultado);

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  };
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(`
      select id = $1 from transacoes where usuario_id = $2`, [id, req.usuario.id]
    );

    if (rowCount < 0) {
      return res.status(404).json({
        mensagem: 'Transação não encontrada.'
      });
    };

    const { rows } = await pool.query(
      `select t.id as id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes as t join categorias as c on t.categoria_id = c.id where t.usuario_id = $1 and t.id = $2`,
      [req.usuario.id, id]
    );

    return res.status(200).json(rows);

  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  };
};

const consultarExtrato = async (req, res) => {
  try {
    const somaEntradas = await pool.query(`select sum(valor) as "total_entrada" from transacoes where tipo = 'entrada' and usuario_id = $1`, [req.usuario.id]);

    const somaSaidas = await pool.query(`select sum(valor) as "total_saida" from transacoes where tipo = 'saida' and usuario_id = $1`, [req.usuario.id]);

    let entrada;
    let saida;

    if( somaEntradas.rows[0].total_entrada === null ) {
      entrada = 0;
    } else {
      entrada = parseFloat(somaEntradas.rows[0].total_entrada)
    }

    if( somaSaidas.rows[0].total_saida === null ) {
      saida = 0;
    } else {
      saida = parseFloat(somaSaidas.rows[0].total_saida)
    }
    const extrato = {
      entrada,
      saida
    }

    return res.status(200).json(extrato);
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      mensagem: 'Erro interno do servidor.'
    });
  };
};

module.exports = {
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  listarTransacoes,
  detalharTransacao,
  consultarExtrato
};