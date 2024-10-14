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
  };

  return TaskListUser;
};
