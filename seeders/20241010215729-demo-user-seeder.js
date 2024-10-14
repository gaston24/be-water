'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Gaston',
        last_name: 'Marcilio',
        user_name: 'gaston2486',
        email: 'gaston.marcilio@gmail.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        first_name: 'Alexis',
        last_name: 'Torrez',
        user_name: 'alexis5665',
        email: 'alexis.torrez@gmail.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
