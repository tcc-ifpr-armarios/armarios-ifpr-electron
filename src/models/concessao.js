const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; // Ajuste o caminho para o seu arquivo de configuração do Sequelize
const Servidor = require('./servidor'); // Ajuste o caminho para o modelo Servidor
const Armario = require('./armario'); // Ajuste o caminho para o modelo Armario

const Concessao = sequelize.define(
  'Concessao',{
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id_concessao'
  },
  descricao: {
    type: DataTypes.STRING(100),
    field: 'descricao'
  },
  dataConcessao: {
    type: DataTypes.DATE,
    field: 'data_concessao',
    defaultValue: DataTypes.NOW
  },
  dataDevolucao: {
    type: DataTypes.DATE,
    field: 'data_devolucao',
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Concessao',
  tableName: 'tb_concessao',
  timestamps: false
});

// Definição das associações
Concessao.belongsTo(Servidor, {
  foreignKey: {
    name: 'id_servidor',
    allowNull: false
  }
});

Concessao.belongsTo(Armario, {
  foreignKey: {
    name: 'id_armario',
    allowNull: false
  }
});

module.exports = Concessao;
