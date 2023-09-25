const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const senhaSecretaJwt = require('../intermediarios/senhaJwt');

const validarRotas = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      mensagem: 'Não autorizado'
    });
  };

  const novoToken = token.split(' ')[1];

  try {
    const { id } = jwt.verify(novoToken, senhaSecretaJwt);

    const { rows, rowCount } = await pool.query('select * from usuarios where id = $1', [id]);

    if (rowCount === 0) {
      return res.status(401).json({
        mensagem: 'Não autorizado'
      });
    };

    const { senha, ...usuario } = rows[0];
    req.usuario = usuario;
    next();

  } catch (error) {
    console.log(error.message)
    return res.status(400).json({
      mensagem: 'Não autenticado.'
    });
  };
};

module.exports = validarRotas;