require('dotenv').config();
const { Sequelize } = require('sequelize');

const database = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  dialect: 'postgres'
});

module.exports = database;