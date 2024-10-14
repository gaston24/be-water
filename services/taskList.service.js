const { TaskList, Task, User } = require('../models');

class TaskListService {
  
  async createTaskList(data) {
    return await TaskList.create({
      name: data.name,
      description: data.description,
      user_id: data.userId, 
    });
  }

  async getAllTaskLists() {
    return await TaskList.findAll({
      include: [
        {
          model: Task, 
          as: 'Tasks' 
        },
        {
          model: User, 
          as: 'User', 
          attributes: ['firstName', 'lastName', 'email'] 
        }
      ]
    });
  }


  async getTaskListById(taskListId) {
    const taskList = await TaskList.findByPk(taskListId, {
      include: [
        {
          model: Task,
          as: 'Tasks'
        },
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName', 'email'] 
        }
      ]
    });

    if (!taskList) {
      throw new Error('Task list not found');
    }
    return taskList;
  }

  async updateTaskList(taskListId, taskListData) {
    const taskList = await TaskList.findByPk(taskListId);
    if (!taskList) {
      throw new Error('Task list not found');
    }

    await taskList.update({
      name: taskListData.name || taskList.name,
      description: taskListData.description || taskList.description,
    });

    return taskList;
  }

  async deleteTaskList(taskListId) {
    const taskList = await TaskList.findByPk(taskListId);
    if (!taskList) {
      throw new Error('Task list not found');
    }

    await taskList.destroy();
    return { message: 'Task list deleted successfully' };
  }


}

module.exports = new TaskListService();
