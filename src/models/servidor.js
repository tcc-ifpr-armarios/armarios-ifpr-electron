// servidor.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Concessao = require('./concessao');

const Servidor = database.define('Servidor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    siape: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

// Servidor.hasMany(Concessao, { as: 'concessoes' });

module.exports = Servidor;
