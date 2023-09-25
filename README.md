# 💰 Projeto Back-end: API - Finanças

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/polianams/api-financas?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/polianams/api-financas">
  
  <a href="https://github.com/polianams/api-financas/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/polianams/api-financas">
  </a>
  
   <a href="https://www.linkedin.com/in/polianams/">
    <img alt="Feito por Poliana Santos" src="https://img.shields.io/badge/feito-por%20Poliana%20Santos-D818A5">
   </a>
   
   <a href="https://github.com/polianams/api-financas/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/polianams/api-financas?style=social">
  </a>
</p>

<h4 align=center> 
	🚧 API de Finanças (CRUD) 🚧
</h4>

<p align="center">
	<img alt="Status Concluído" src="https://img.shields.io/badge/STATUS-CONCLU%C3%8DDO-brightgreen">
</p>

## 📝 Sobre o Projeto

Este projeto consiste em uma RESTful API desenvolvida para atender às necessidades de gerenciamento de usuários, categorias e transações.

## 📋 Funcionalidades

Com esta API, os usuários podem realizar as seguintes ações:

1. Gerenciamento de Usuários
- Cadastrar Usuário: Os usuários podem se registrar na plataforma, fornecendo informações básicas;
- Fazer Login: Usuários registrados podem fazer login para acessar suas contas;
- Detalhar Perfil do Usuário Logado: Os usuários podem visualizar informações detalhadas de seu próprio perfil;
- Editar Perfil do Usuário Logado: Usuários têm a capacidade de atualizar suas informações de perfil.

2. Gerenciamento de Categorias
- Listar Categorias: A API permite listar todas as categorias disponíveis.

3. Gerenciamento de Transações
- Listar Transações: Os usuários podem visualizar uma lista de todas as transações;
- Detalhar Transação: Detalhes específicos de uma transação podem ser acessados;
- Cadastrar Transação: Usuários podem criar novas transações;
- Editar Transação: Transações existentes podem ser atualizadas;
- Remover Transação: Exclusão de transações, se necessário;
- Obter Extrato de Transações: Os usuários podem gerar um extrato de suas transações;
- Filtrar Transações por Categoria (Extra): Os usuários têm a opção de filtrar transações com base em categorias específicas;

## ▶️ Como executar o projeto

### 🛠️ Pré-requisitos

- Possuir um editor de código-fonte, por exemplo [VSCode](https://code.visualstudio.com/download) ou [Vim](https://www.vim.org/download.php);
- Possuir o [Git](https://git-scm.com/downloads) ou qualquer outro programa de versionamento;
- Possuir o [Node.js](https://nodejs.org/en/download/current) (versão 18.16.0 ou superior);
- Possuir o [Insomnia](https://insomnia.rest/download) instalado;
- Possuir o [Beekeeper](https://www.beekeeperstudio.io/) instalado para criar e acessar o banco de dados (versão 3.9.20 ou superior).

### ⚙️ Instalação

1. Clone este repositório em sua máquina local:
2. Navegue até o diretório do projeto: 
```
cd nome_da_pasta
```
3. Instale as dependências através do comando: 
```
npm install
```
4. Para executa-lo digite no terminal do seu editor de código: 
```
npm run dev
```
5. No terminal, aparecerá a seguinte mensagem: `O Servidor está sendo executado na porta 3000.`;
6. Após exibir a mensagem acima, é necessário configurar o Beekeeper para gerenciar o banco de dados. Siga as configurações do arquivo `conexao.js`, localizado na pasta `src`, para configurar corretamente o Beekeeper;
7. Logo depois de configurar o Beekeeper, execute o Insomnia e configure um novo ambiente para testar as rotas da API. É possível fazer os testes importando o arquivo [`insomnia`](https://github.com/polianams/api-financas/blob/master/insomnia).

## 🚀 Tecnologias Utilizadas

1. Node.js (versão 18.16.0);
   
2. Bibliotecas:
- Express (versão 4.18.2);
- Nodemon (versão 3.0.1);
- Date-fns (versão 2.30.0);
- Bcrypt (versão 5. 1. 1);
- jsonwebtoken (versão 9. 0. 2);
- pg ou node-postgres (versão 8. 11. 3);
  
3. Linguagem de programação:
- JavaScript.

## 🎲 Demonstração da Aplicação

<h1 align="center">
    <img alt="api-financas" title="api-financas" src="assets/api-financas-1.gif" />
    <img alt="api-financas" title="api-financas" src="assets/api-financas-2.gif" />
    <img alt="api-financas" title="api-financas" src="assets/api-financas-3.gif" />
</h1>

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quiser melhorar ou adicionar novos recursos a esta API, siga as etapas abaixo:

1. Crie um Fork deste repositório;
2. Crie uma branch para suas alterações: `git checkout -b my-feature`;
3. Commit suas alterações: `git commit -m 'Adicionar nova funcionalidade'`;
4. Faça push para a branch: `git push origin my-feature`;
5. Abra um pull request.

## 🧙‍♂️ Autora

Projeto Back-end desenvolvido por [Poliana Santos](https://www.linkedin.com/in/polianams/), como desafio do modulo 3 do curso de Desenvolvimento de Software - Foco em Back-end da [Cubos Academy](https://cubos.academy/) ✨

## 📝 Licença

Feito por Poliana Santos 👋🏽 [Entre em contato!](https://www.linkedin.com/in/polianams/)

Divirta-se explorando a API! 🌟

###### tags: `back-end` `nodeJS` `PostgreSQL` `API REST` `bcrypt` `SQL` .
