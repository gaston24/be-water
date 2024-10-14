'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskList = sequelize.define('TaskList', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'task_lists',
    underscored: true
  });

  TaskList.associate = function(models) {
    TaskList.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' }); 
    TaskList.hasMany(models.Task, { foreignKey: 'task_list_id', as: 'Tasks' }); 
    TaskList.hasMany(models.TaskListUser, { foreignKey: 'tasklist_id', as: 'SharedUsers'});
  };

  return TaskList;
};
