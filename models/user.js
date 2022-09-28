const { DataTypes } = require('sequelize');
const { db } = require('../config/connectDB.js');


const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING(40),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING(40),
    allowNull: false,
    field: 'last_name'
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at'
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at'
  }
},
  { tableName: 'user' });

module.exports = { User };
