const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/ajax_demo');

db.define('game', {
  name: Sequelize.STRING
});

module.exports = db;
