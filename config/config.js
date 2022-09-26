const { config } = require('dotenv');


config({
  path: './.env'
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: JSON.parse(process.env.DB_PASS),
    database: 'larnu_dev',
    host: process.env.DB_URL,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: JSON.parse(process.env.DB_PASS),
    database: 'larnu_test',
    host: process.env.DB_URL,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_URL,
    dialect: 'postgres'
  }
};
