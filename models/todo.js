const { DataTypes } = require('sequelize');
const { db } = require('../config/connectDB.js');
const { User } = require('./user.js');


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
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
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
  { tableName: 'todo' });

// This creates the `user_id` foreign key in Todo.
Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false,
    name: 'user_id',
  }
});

User.hasOne(Todo, {
  onDelete: 'CASCADE',
});

module.exports = { Todo };
