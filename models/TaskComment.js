'use strict';

module.exports = (sequelize, DataTypes) => {
  const TaskComment = sequelize.define('TaskComment', {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    tableName: 'task_comments',
    underscored: true,
  });

  TaskComment.associate = (models) => {
    TaskComment.belongsTo(models.Task, {
      foreignKey: 'task_id',
      as: 'Task',
    });

    TaskComment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'User',
    });
  };

  return TaskComment;
};
