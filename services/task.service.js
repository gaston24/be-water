const { Task, TaskList } = require('../models');

class TaskService {

  // Traer todas las tareas
  async getAllTasks() {
    const tasks = await Task.findAll();
    console.log(tasks);
    return tasks;
  }

  // Obtener una tarea por su ID
  async getTaskById(taskId) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  // Actualizar una tarea
  async updateTask(taskId, taskData) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    await task.update({
      name: taskData.name || task.name,
      description: taskData.description || task.description,
    });

    return task;
  }

  // Eliminar una tarea
  async deleteTask(taskId) {
    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    await task.destroy();
    return { message: 'Task deleted successfully' };
  }
}

module.exports = new TaskService();
