const errosUsuario = {
  usuarioErro: "Usuário não pode ser criado!",
  usuarioNaoEncontrado: "Usuário não encontrado.",
  usuarioJaExiste: "O e-mail informado já existe em nossa base de dados.",
  usuarioCadastroDadosInvalido: "É obrigatório informar nome, e-mail e senha.",
};

const errosLogin = {
  loginInvalido: "E-mail ou senha inválidos.",
  emailInvalido: "O campo e-mail precisa ter um formato válido.",
  tamanhoMinimoSenha: "A senha precisar conter, no mínimo, cinco caracteres.",
};

const errosTransacao = {
  tipoErrado: "O campo tipo deve ser exatamente entrada ou saida.",
  categoriaErrada: "A categoria especificada não existe.",

  transacaoNaoEncontrada:
    "A transação especificada não existe ou não pertence ao usuário logado.",
};

const errosGerais = {
  naoAutorizado: "Usuario não autenticado.",
  erroServidor: "Erro interno do servidor.",
  camposObrigatorios: "Todos os campos devem ser informados.",
};

module.exports = {
  errosGerais,
  errosLogin,
  errosUsuario,
  errosTransacao,
};
