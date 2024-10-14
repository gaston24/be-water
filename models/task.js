'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'tasks',
    underscored: true
  });

  Task.associate = function(models) {
    Task.belongsTo(models.TaskList, { foreignKey: 'task_list_id', as: 'TaskList' }); 
  };

  return Task;
};
