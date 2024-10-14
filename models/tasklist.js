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
  
  TaskList.prototype.getAllUsers = async function () {
    const owner = await sequelize.models.User.findByPk(this.user_id, {
      attributes: ['id', 'userName', 'email']  // Solo los campos necesarios
    });

    const sharedUsers = await sequelize.models.TaskListUser.findAll({
      where: { tasklist_id: this.id },
      include: [{
        model: sequelize.models.User,
        as: 'SharedToUser',
        attributes: ['id', 'userName', 'email']
      }]
    });

    const sharedUserList = sharedUsers.map(user => user.SharedToUser);

    const allUsers = [owner, ...sharedUserList];

    const uniqueUsers = allUsers.filter((value, index, self) =>
      index === self.findIndex((u) => u.id === value.id)
    );

    return uniqueUsers;
  };

  return TaskList;
};
