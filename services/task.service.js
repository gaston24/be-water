const { Task, TaskList, TaskListUser, User, TaskComment, sequelize } = require('../models');
const { Op } = require('sequelize');

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

  // Crear una tarea
  async createTask(data, userId) {

    const taskList = await TaskList.findOne({
      where: {
        id: data.taskListId,
        [Op.or]: [
          { user_id: userId }, 
          sequelize.where( 
            sequelize.col('SharedUsers.shared_to'),
            userId
          )
        ]
      },
      include: [
        {
          model: TaskListUser,
          as: 'SharedUsers', 
          required: false 
        }
      ]
    });
  

    if (!taskList) {
      throw new Error('You do not have permission to add tasks to this task list');
    }

    return await Task.create({
      name: data.name,
      description: data.description,
      task_list_id: data.taskListId,
    });
  }

  // Actualizar una tarea
  async updateTask(taskId, taskData, userId) {

    const task = await Task.findByPk(taskId);
  
    if (!task) {
      throw new Error('Task not found');
    }

    const taskList = await TaskList.findOne({
      where: {
        id: task.task_list_id,
        [Op.or]: [
          { user_id: userId }, 
          sequelize.where(  
            sequelize.col('SharedUsers.shared_to'),
            userId
          )
        ]
      },
      include: [
        {
          model: TaskListUser,
          as: 'SharedUsers',
          required: false
        }
      ]
    });
  
   
    if (!taskList) {
      throw new Error('You do not have permission to update tasks in this task list');
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

  async createComment(taskId, userId, comment) {

    const task = await Task.findByPk(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
 
    const taskList = await TaskList.findOne({
      where: {
        id: task.task_list_id,
        [Op.or]: [
          { user_id: userId },
          sequelize.where(
            sequelize.col('SharedUsers.shared_to'),
            userId
          )
        ]
      },
      include: [
        {
          model: TaskListUser,
          as: 'SharedUsers',
          required: false
        }
      ]
    });

    if (!taskList) {
      throw new Error('You do not have permission to comment on this task');
    }

    return await TaskComment.create({
      task_id: taskId,
      user_id: userId,
      comment,
    });
  }


  async getComments(taskId) {
    const taskComments = await TaskComment.findAll({
      where: {
        task_id: taskId,
      },
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName'],
        }
      ]
    });

    return taskComments;
  }

}

module.exports = new TaskService();
