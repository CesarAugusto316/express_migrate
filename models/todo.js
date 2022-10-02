const { DataTypes } = require('sequelize');
const { db } = require('../config/connectDB.js');
const { User } = require('./user.js');


const Todo = db.define('todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
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

// This creates the `user_id` foreign key in Todo.
Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    field: 'user_id'
  },
  onDelete: 'CASCADE'
});

User.hasMany(Todo, {
  onDelete: 'CASCADE',
});

module.exports = { Todo };
