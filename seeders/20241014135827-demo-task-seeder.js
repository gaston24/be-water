'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('tasks', [
      {
        name: 'Tarea 1',
        description: 'Descripción de la tarea 1',
        task_list_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tarea 2',
        description: 'Descripción de la tarea 2',
        task_list_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tarea 3',
        description: 'Descripción de la tarea 3',
        task_list_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tarea 4',
        description: 'Descripción de la tarea 4',
        task_list_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('tasks', null, {});
  }
};
