// emprestimo.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Estudante = require('./estudante');
const Armario = require('./armario');

const Emprestimo = sequelize.define('Emprestimo', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data_devolucao: {
    type: DataTypes.DATE,
    allowNull: false
  },
  data_emprestimo: {
    type: DataTypes.DATE,
    allowNull: false
  }
});



module.exports = Emprestimo;
