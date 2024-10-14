'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('task_lists', [
      {
        name: 'Lista de Tareas de Proyecto A',
        description: 'Tareas para completar el Proyecto A',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lista de Tareas de Proyecto B',
        description: 'Tareas para completar el Proyecto B',
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Lista de Tareas de Proyecto C',
        description: 'Tareas para completar el Proyecto C',
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('task_lists', null, {});
  }
};
