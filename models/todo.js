const { DataTypes } = require('sequelize');
const { db } = require('../config/connectDB.js');


const Todo = db.define('todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  { tableName: 'todo' });

module.exports = { Todo };
