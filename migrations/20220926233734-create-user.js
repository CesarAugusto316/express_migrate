'use strict';

module.exports = {
  /**
  * 
  * @param {import('sequelize').QueryInterface} queryInterface 
  * @param {import('sequelize').Sequelize} Sequelize 
  */
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade'
      },
      firstName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        field: 'first_name'
      },
      lastName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        field: 'last_name'
      },
      password: {
        type: Sequelize.STRING(128),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   */
  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user');
  }
};
