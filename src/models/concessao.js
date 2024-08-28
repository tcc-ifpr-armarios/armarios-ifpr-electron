// concessao.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Servidor = require('./servidor');
const Armario = require('./armario');

const Concessao = sequelize.define('Concessao', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});


// Concessao.belongsTo(Servidor, { as: 'servidor' });
// Concessao.belongsTo(Armario, { as: 'armario' });

module.exports = Concessao;
