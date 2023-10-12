const pool = require("../../conexao");

const {
  errosGerais,
  errosTransacao,
} = require("../../constants/errosMensagens");

const cadastrarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;

  if (!descricao || !valor || !data || !categoria_id || !tipo) {
    return res.status(404).json({
      mensagem: errosGerais.camposObrigatorios,
    });
  }

  if (tipo !== "entrada" && tipo !== "saida") {
    return res.status(400).json({
      mensagem: errosTransacao.tipoErrado,
    });
  }

  try {
    const { rows, rowCount } = await pool.query(
      `select * from categorias where id = $1`,
      [categoria_id]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: errosTransacao.categoriaErrada,
      });
    }

    await pool.query(
      `insert into transacoes (descricao, valor, data, categoria_id, usuario_id, tipo) values ($1, $2, $3, $4, $5, $6) returning *`,
      [descricao, valor, data, categoria_id, req.usuario.id, tipo]
    );

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
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
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
        mensagem: errosTransacao.transacaoNaoEncontrada,
      });
    }

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
      return res.status(400).json({
        mensagem: errosGerais.camposObrigatorios,
      });
    }

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({
        mensagem: errosTransacao.tipoErrado,
      });
    }

    const { rowCount } = await pool.query(
      `select * from categorias where id = $1`,
      [categoria_id]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: errosTransacao.categoriaErrada,
      });
    }

    await pool.query(
      `update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6`,
      [descricao, valor, data, categoria_id, tipo, id]
    );

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

const deletarTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      `
    select * from transacoes where id = $1 and usuario_id = $2`,
      [id, req.usuario.id]
    );

    if (rowCount < 1) {
      return res.status(400).json({
        mensagem: errosTransacao.transacaoNaoEncontrada,
      });
    }

    await pool.query(`delete from transacoes where id = $1`, [id]);

    return res.status(204).send();
  } catch (error) {
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
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

    if (filtroArray.length > 0) {
      for (let i = 0; i < filtroArray.length; i++) {
        for (let j = 0; j < rowCount; j++) {
          if (rows[j].categoria_nome === filtro[i]) {
            resultado.push(rows[j]);
          }
        }
      }
    } else {
      resultado = rows;
    }

    return res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

const detalharTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      `
      select id = $1 from transacoes where usuario_id = $2`,
      [id, req.usuario.id]
    );

    if (rowCount < 0) {
      return res.status(404).json({
        mensagem: errosTransacao.transacaoNaoEncontrada,
      });
    }

    const { rows } = await pool.query(
      `select t.id as id, t.tipo, t.descricao, t.valor, t.data, t.usuario_id, t.categoria_id, c.descricao as categoria_nome from transacoes as t join categorias as c on t.categoria_id = c.id where t.usuario_id = $1 and t.id = $2`,
      [req.usuario.id, id]
    );

    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      mensagem: errosGerais.erroServidor,
    });
  }
};

module.exports = {
  cadastrarTransacao,
  atualizarTransacao,
  deletarTransacao,
  detalharTransacao,
  listarTransacoes,
};
