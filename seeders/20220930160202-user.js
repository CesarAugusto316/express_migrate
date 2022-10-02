const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');


const users = [...Array(10)].map(() => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  return {
    'first_name': firstName,
    'last_name': lastName,
    'email': faker.internet.email(firstName, lastName),
    'password': bcrypt.hashSync('123456', 10),
    'created_at': faker.date.between('2020-01-01T00:00:00.000Z', '2021-01-01T00:00:00.000Z'),
    'updated_at': faker.date.between('2021-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z')
  };
});

module.exports = {
  /**
  * 
  * @param {import('sequelize').QueryInterface} queryInterface 
  */
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('user', users, {});
  },

  /**
  * 
  * @param {import('sequelize').QueryInterface} queryInterface 
  */
  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user', null, {});
  }
};
