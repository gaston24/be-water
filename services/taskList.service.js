const { TaskList, Task, User, TaskListUser, sequelize  } = require('../models');
const { Op } = require('sequelize');

class TaskListService {
  
  async createTaskList(data) {
    return await TaskList.create({
      name: data.name,
      description: data.description,
      user_id: data.userId, 
    });
  }

  async getAllTaskLists(userId) {
    return await TaskList.findAll({
      where: {
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
          model: Task,
          as: 'Tasks'
        },
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName', 'email']
        },
        {
          model: TaskListUser,
          as: 'SharedUsers',
          required: false,
        }
      ]
    });
  }
  
  async getTaskListById(taskListId, userId) {
    const taskList = await TaskList.findOne({
      where: {
        id: taskListId,
      },
      include: [
        {
          model: Task,
          as: 'Tasks',
        },
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName', 'email'],
        },
        {
          model: TaskListUser,
          as: 'SharedUsers',
          where: { shared_to: userId },
          required: false,
        },
      ],
    });
  
    if (!taskList || (taskList.user_id !== userId && taskList.SharedUsers.length === 0)) {
      throw new Error('Task list not found or not accessible');
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
  
  async shareTaskList(taskListId, ownerId, sharedToId) {
    const taskList = await TaskList.findOne({
      where: {
        id: taskListId,
        user_id: ownerId,
      },
    });
  
    if (!taskList) {
      throw new Error('Task list not found or you are not the owner');
    }
    
    if (ownerId === sharedToId) {
      throw new Error('You cannot share the task list with yourself');
    }

    const existingShare = await TaskListUser.findOne({
      where: {
        tasklist_id: taskListId,
        owner_id: ownerId,
        shared_to: sharedToId,
      },
    });
  
    if (existingShare) {
      throw new Error('Task list already shared with this user');
    }
  
    await TaskListUser.create({
      tasklist_id: taskListId,
      owner_id: ownerId,
      shared_to: sharedToId,
    });
  
    return { message: 'Task list shared successfully' };
  }
  
  async removeShare(taskListId, sharedToId) {
    const taskList = await TaskList.findByPk(taskListId);
    if (!taskList) {
      throw new Error('Task list not found');
    }
  
    await TaskListUser.destroy({
      where: {
        tasklist_id: taskListId,
        shared_to: sharedToId
      },
    });
  
    return { message: 'Task list unshared successfully' };
  }
  

}

module.exports = new TaskListService();
