'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {  
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name' 
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'user_name'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'users', 
    underscored: true 
  });

  return User;
};
