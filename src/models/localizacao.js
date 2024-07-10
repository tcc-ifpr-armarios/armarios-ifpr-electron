// localizacao.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Localizacao = database.define('Localizacao', {
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Localizacao;
