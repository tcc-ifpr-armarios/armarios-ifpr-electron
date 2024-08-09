const { DataTypes } = require('sequelize');
const database = require('../config/database');
// const Emprestimo = require('./emprestimo');
// const Curso = require('./curso');

const Estudante = database.define('Estudante', {
    ra: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
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
        allowNull: true,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Estudante;


// Estudante.hasMany(Emprestimo, { as: 'emprestimos' });
// Estudante.belongsTo(Curso, { as: 'curso' });