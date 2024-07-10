// sequelize.js

const { Sequelize } = require('sequelize');

// Replace 'your_database_name', 'your_username', and 'your_password' with your PostgreSQL database credentials
const database = new Sequelize('armarios_ifpr', 'postgres', 'allanrafaela123', {
  host: 'localhost',
  port: 5432, 
  dialect: 'postgres'
});

module.exports = database;