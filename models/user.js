'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      }
    },
    lastName: {
      type: DataTypes.STRING(40),
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      }
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
