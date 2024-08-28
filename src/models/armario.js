// armario.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Localizacao = require('./localizacao');
const StatusArmario = require('./statusArmario');

const Armario = sequelize.define(
  'Armario',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_armario',
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(StatusArmario),
      allowNull: false,
      defaultValue: StatusArmario.ATIVO
    },
  },
  {
    tableName: 'tb_armario',
    timestamps: false,
  },
);

Armario.belongsTo(Localizacao, {
  as: 'localizacao',
  foreignKey: {
    name: 'idLocalizacao',     // Nome da chave estrangeira no Sequelize
    field: 'id_localizacao', // Nome da coluna no banco de dados
    allowNull: false         // A chave estrangeira não pode ser NULL
  },
});

module.exports = Armario;
