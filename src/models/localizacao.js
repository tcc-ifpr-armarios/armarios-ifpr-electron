// Localizacao.js
"use strict";

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Localizacao = sequelize.define(
  'Localizacao',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      field: 'id_localizacao',
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: 'tb_localizacao',
    timestamps: false,
  },
);

module.exports = Localizacao;
