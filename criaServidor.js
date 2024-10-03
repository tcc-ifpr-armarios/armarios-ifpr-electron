// insert-servidor.js

// Caminho para seu arquivo de configuração do Sequelize
const { sequelize } = require("./src/config/database");
const { Servidor } = require("./src/models");

async function insertServidor() {
  try {
    // Sincronizar os modelos com o banco de dados (cria as tabelas se não existirem)
    // await sequelize.sync({ force: false, alter: false });
    // Criar um novo registro
    const novoServidor = await Servidor.create({
      nome: "João",
      sobrenome: "Silva",
      senha: "0202052a5d7b40eb0a4fccf6718f52e29b8c6361fb418860f7513a80dce880e9", // 123456
      email: "joao.silva@example.com",
      ativo: true,
      telefone: "(11) 91234-5678",
      siape: "1234567",
    });

    console.log("Novo Servidor criado com sucesso:", novoServidor.toJSON());
  } catch (error) {
    console.error("Erro ao inserir o servidor:", error);
  } finally {
    // Fechar a conexão com o banco de dados
    await sequelize.close();
  }
}

insertServidor();
