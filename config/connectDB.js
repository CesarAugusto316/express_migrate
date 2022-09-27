const { Sequelize } = require('sequelize');
const dbConfig = require('./config.js');


const config = dbConfig[process.env.NODE_ENV];

const db = new Sequelize(config.host, {
  database: config.database,
  dialect: config.dialect,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  },
  logging: false
});

const connectDb = async () => {
  console.log('[NODE_ENV ⚡]', process.env.NODE_ENV);
  try {
    await db.authenticate();
    console.log('[DB ⚡] connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { connectDb };
