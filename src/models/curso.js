// Curso.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Curso = database.define('Curso', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

module.exports = Curso;
