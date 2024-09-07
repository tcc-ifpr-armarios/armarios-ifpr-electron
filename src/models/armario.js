const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Ajuste o caminho para o seu arquivo de configuração do Sequelize
const Localizacao = require('./localizacao'); // Ajuste o caminho para o modelo Localizacao
const StatusArmario = require('./statusArmario'); // Ajuste o caminho para a enumeração StatusArmario, se necessário

const Armario = sequelize.define(
  'Armario',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_armario'
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'numero'
  },
  status: {
    type: DataTypes.ENUM(...Object.values(StatusArmario)),
    allowNull: false,
    defaultValue: 'ATIVO',
    field: 'status'
  }
}, {
  sequelize,
  modelName: 'Armario',
  tableName: 'tb_armario',
  timestamps: false
});

// Definição das associações
Armario.belongsTo(Localizacao, {
  foreignKey: {
    name: 'id_localizacao',
    allowNull: false
  }
});

module.exports = Armario;
