"use strict";

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Curso = sequelize.define(
  'Curso',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_curso',
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'nome',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'ativo',
    },
  },
  {
    sequelize, // Instância da conexão do Sequelize
    modelName: 'Curso',
    tableName: 'tb_curso',
    timestamps: false,
  }
);

module.exports = Curso;
