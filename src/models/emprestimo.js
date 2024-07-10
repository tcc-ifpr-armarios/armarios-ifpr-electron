// emprestimo.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Estudante = require('./estudante');
const Armario = require('./armario');

const Emprestimo = database.define('Emprestimo', {
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
