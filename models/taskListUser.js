'use strict';

module.exports = (sequelize, DataTypes) => {
  const TaskListUser = sequelize.define('TaskListUser', {
    tasklist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'task_lists',
        key: 'id'
      }
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    shared_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'task_list_user',
    underscored: true
  });

  TaskListUser.associate = (models) => {
    TaskListUser.belongsTo(models.TaskList, {
      foreignKey: 'tasklist_id',
      as: 'TaskList'
    });

    TaskListUser.belongsTo(models.User, {
      foreignKey: 'shared_to',
      as: 'SharedToUser'
    });

    TaskListUser.belongsTo(models.User, {
      foreignKey: 'owner_id',
      as: 'OwnerUser'
    });
  };

  TaskListUser.prototype.getUsersInTaskList = async function () {

    const taskListUsers = await TaskListUser.findAll({
      where: { tasklist_id: this.tasklist_id },
      include: [
        {
          model: sequelize.models.User,
          as: 'SharedToUser',
          attributes: ['id', 'userName', 'email']
        },
        {
          model: sequelize.models.User,
          as: 'OwnerUser',
          attributes: ['id', 'userName', 'email']
        }
      ]
    });

    const owner = taskListUsers[0]?.OwnerUser; 

    const sharedUsers = taskListUsers.map(user => user.SharedToUser);
    const allUsers = [...sharedUsers];

    if (owner) {
      allUsers.push(owner);
    }

    const uniqueUsers = allUsers.filter((value, index, self) =>
      index === self.findIndex((u) => u.id === value.id)
    );

    return uniqueUsers;
  };

  return TaskListUser;
};
