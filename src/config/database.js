require('dotenv').config();
const { Sequelize } = require('sequelize');

const config = require('./config');

// Definindo o ambiente (pode ser 'dev', 'test', ou 'prod')
const env = process.env.NODE_ENV || 'dev';
const envConfig = config[env];

const sequelize = new Sequelize({
  database: envConfig.DB_NAME,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASS,
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  dialect: envConfig.DB_DIALECT
});

module.exports = { sequelize, envConfig };