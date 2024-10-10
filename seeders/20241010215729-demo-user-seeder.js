'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Gaston',
        lastName: 'Marcilio',
        userName: 'gaston2486',
        email: 'gaston.marcilio@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        firstName: 'Alexis',
        lastName: 'Torrez',
        userName: 'alexis5665',
        email: 'alexis.torrez@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
