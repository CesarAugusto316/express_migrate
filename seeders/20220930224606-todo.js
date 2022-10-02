const { faker } = require('@faker-js/faker');


const todos = [...Array(40)].map(() => {
  return {
    'user_id': faker.datatype.number({ min: 1, max: 10 }),
    'title': faker.lorem.words(3),
    'description': faker.lorem.sentence(5),
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
    await queryInterface.bulkInsert('todo', todos, {});
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
    await queryInterface.bulkDelete('todo', null, {});
  }
};
