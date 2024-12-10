const { DataTypes } = require("sequelize");
const sequelize = require("../config/database").sequelize; // Substitua pelo caminho correto para sua instância do Sequelize
const Curso = require("./Curso"); // Substitua pelo caminho correto para o modelo Curso

const Estudante = sequelize.define(
  "Estudante",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_estudante',
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sobrenome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_atualizacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ra: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    id_curso: {
      type: DataTypes.INTEGER,
      references: {
        model: Curso,
        key: "id_curso",
      },
      allowNull: false,
    },
  },
  {
    tableName: "tb_estudante",
    timestamps: false,
  }
);

module.exports = Estudante;
