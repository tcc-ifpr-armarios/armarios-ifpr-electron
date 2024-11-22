"use strict";

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize; 
const Estudante = require('./Estudante');
const Armario = require('./Armario');

const Emprestimo = sequelize.define(
  'Emprestimo',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_emprestimo',
    },
    dataEmprestimo: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'data_emprestimo',
    },
    dataDevolucao: {
      type: DataTypes.DATE,
      field: 'data_devolucao',
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Emprestimo',
    tableName: 'tb_emprestimo',
    timestamps: false,
  }
);

Emprestimo.belongsTo(Estudante, { foreignKey: 'id_estudante', allowNull: false });
Emprestimo.belongsTo(Armario, { foreignKey: 'id_armario', allowNull: false });


module.exports = Emprestimo;
