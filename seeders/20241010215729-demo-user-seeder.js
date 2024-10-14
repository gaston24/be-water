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
        password: '$2a$10$A9vzdjfbA.49y.rR1yQnV.sBcsGtyr45irWsrW6fFuIiFUNy2yBjG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        first_name: 'Alexis',
        last_name: 'Torrez',
        user_name: 'alexis5665',
        email: 'alexis.torrez@gmail.com',
        password: '$2a$10$A9vzdjfbA.49y.rR1yQnV.sBcsGtyr45irWsrW6fFuIiFUNy2yBjG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        first_name: 'Maria',
        last_name: 'Fernandez',
        user_name: 'mariaf',
        email: 'maria.fernandez@gmail.com',
        password: '$2a$10$A9vzdjfbA.49y.rR1yQnV.sBcsGtyr45irWsrW6fFuIiFUNy2yBjG',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        first_name: 'Juan',
        last_name: 'Pérez',
        user_name: 'juanp',
        email: 'juan.perez@gmail.com',
        password: '$2a$10$A9vzdjfbA.49y.rR1yQnV.sBcsGtyr45irWsrW6fFuIiFUNy2yBjG',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
