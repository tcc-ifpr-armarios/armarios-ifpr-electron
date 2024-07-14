// armario.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');

const Concessao = require('./concessao');
const Emprestimo = require('./emprestimo');
const Localizacao = require('./localizacao');

const Armario = database.define('Armario', {
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.ENUM('ATIVO', 'INATIVO', 'EM_MANUTENCAO', 'OCUPADO'),
    allowNull: false,
    defaultValue: 'ATIVO'
  },
  
});

// Armario.belongsTo(Localizacao, { as: 'localizacao' });
// Armario.hasMany(Emprestimo, { as: 'emprestimos' });
// Armario.hasMany(Concessao, { as: 'concessoes' });

module.exports = Armario;
