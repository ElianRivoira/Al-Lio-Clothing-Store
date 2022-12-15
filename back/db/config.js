const Sequelize = require("sequelize");

const db = new Sequelize("al_lio", 'Elian', '3214', {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
