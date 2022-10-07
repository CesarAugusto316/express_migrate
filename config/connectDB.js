const { Sequelize } = require('sequelize');
const dbConfig = require('./config.js');


const config = dbConfig[process.env.NODE_ENV];

/**
 * 
 * @description depending on the environment we connect to a given
 * database
 */
const db = new Sequelize(process.env.DB_URL, {
  database: config.database,
  dialect: config.dialect,
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? true : false,
  },
  logging: false
});

const connectDb = async () => {
  try {
    await db.authenticate();
    console.log(`[DB ⚡] ${db.getDatabaseName()} connection has been established successfully.`);
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
};

module.exports = { connectDb, db };
