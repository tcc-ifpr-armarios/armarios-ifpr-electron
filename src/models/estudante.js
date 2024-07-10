// estudante.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');
const Emprestimo = require('./emprestimo');
const Curso = require('./curso');

const Estudante = database.define('Estudante', {
    ra: {
        type: DataTypes.STRING,
        allowNull: false
    },
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
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

});


// Estudante.hasMany(Emprestimo, { as: 'emprestimos' });
// Estudante.belongsTo(Curso, { as: 'curso' });

module.exports = Estudante;
