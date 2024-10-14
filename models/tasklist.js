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
    TaskList.belongsTo(models.User, { foreignKey: 'user_id' });
    TaskList.hasMany(models.Task, { foreignKey: 'task_list_id' });
  };

  return TaskList;
};
