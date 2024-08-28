// Curso.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Curso = sequelize.define('Curso', {
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
