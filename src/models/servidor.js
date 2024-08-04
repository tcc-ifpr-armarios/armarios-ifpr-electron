// servidor.js

const { DataTypes } = require('sequelize');
const database = require('../config/database');
//const Concessao = require('./concessao');

const Servidor = database.define('Servidor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
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
            isTelefoneCustom(value) {
                if (!/^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/.test(value)) {
                    throw new Error('Formato de telefone inválido');
                }
            }
        }
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,

    },
    siape: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

// Servidor.hasMany(Concessao, { as: 'concessoes' });

module.exports = Servidor;
