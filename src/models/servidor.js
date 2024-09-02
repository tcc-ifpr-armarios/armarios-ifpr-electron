const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; 

const Servidor = sequelize.define('Servidor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_pessoa'
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
  siape: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  modelName: 'Servidor',
  tableName: 'tb_servidor',
  timestamps: false,
});

module.exports = Servidor;
