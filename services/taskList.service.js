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
          where: {
            permission: {
              [Op.or]: ['R', 'E', 'D']
            }
          }
        }
      ]
    });
  }

  async getTaskListByTaskListId(taskListId) {
    return await TaskList.findByPk(taskListId, {
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
          where: {
            shared_to: userId,
            permission: {
              [Op.or]: ['R', 'E', 'D'], // Permisos de lectura, edición o eliminación
            },
          },
          required: false,
        },
      ],
    });
  
    if (!taskList) {
      throw new Error('Task list not found');
    }
  
    const isOwner = taskList.user_id === userId;
    const hasPermission = taskList.SharedUsers.length > 0;
  
    if (!isOwner && !hasPermission) {
      throw new Error('Task list not accessible');
    }
  
    return taskList;
  }
  

  async updateTaskList(taskListId, taskListData, userId) {
    const taskList = await TaskList.findOne({
      where: {
        id: taskListId,
        [Op.or]: [
          { user_id: userId },  
          {
            '$SharedUsers.shared_to$': userId,  
            '$SharedUsers.permission$': { [Op.or]: ['E', 'D'] }, 
          },
        ],
      },
      include: [
        {
          model: TaskListUser,
          as: 'SharedUsers',
          required: false,
        },
      ],
    });
  

    if (!taskList) {
      throw new Error('Task list not found or you do not have permission to update this task list');
    }
  
    await taskList.update({
      name: taskListData.name || taskList.name,
      description: taskListData.description || taskList.description,
    });
  
    return taskList;
  }
  
  async deleteTaskList(taskListId, userId) {
    const taskList = await TaskList.findOne({
      where: {
        id: taskListId,
        [Op.or]: [
          { user_id: userId },
          {
            '$SharedUsers.shared_to$': userId, 
            '$SharedUsers.permission$': { [Op.or]: ['D'] }, 
          },
        ],
      },
      include: [
        {
          model: TaskListUser,
          as: 'SharedUsers',
          required: false,
        },
      ],
    });
  
    if (!taskList) {
      throw new Error('Task list not found or you do not have permission to delete this list');
    }
  
    await taskList.destroy();
    return { message: 'Task list deleted successfully' };
  }
  
  async shareTaskList(taskListId, ownerId, sharedToId, permission = 'R') {
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
      permission: permission || 'R',
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

  async getAllUsers(taskListId) {
    const taskList = await TaskListUser.findByPk(taskListId);

    return await taskList.getUsersInTaskList();
  }
  

}

module.exports = new TaskListService();
