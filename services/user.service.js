const { User } = require('../models');

class UserService {
  async createUser(data) {
    return await User.create(data);
  }

  async getAllUsers() {
    return await User.findAll();
  }

  async getUserById(id) {
    return await User.findByPk(id);
  }

  async updateUser(id, data) {
    return await User.update(data, { where: { id } });
  }

  async deleteUser(id) {
    return await User.destroy({ where: { id } });
  }
}

module.exports = new UserService();
