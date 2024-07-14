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
        validate: {
            isEmail: {
                args: true,
                msg: 'O email fornecido não é válido'
            }
        }
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isTelefone: {
                args: true,
                msg: 'O telefone fornecido não é válido'
            },
            isTelefoneCustom(value) {
                if (!/^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/.test(value)) {
                    throw new Error('Formato de telefone inválido');
                }
            }
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Estudante;


// Estudante.hasMany(Emprestimo, { as: 'emprestimos' });
// Estudante.belongsTo(Curso, { as: 'curso' });