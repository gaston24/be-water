const { User } = require('../models');

class NotificationService {

    async getUserById(userId) {
      return User.findByPk(userId);
    }

    async sendNotification(user, message) {

      const userToSend = await this.getUserById(user);

      console.log(`=====================================================================`);
      console.log(`send notification to user: ${userToSend.userName}: ${message}`);
      console.log(`=====================================================================`);

      return true;
    }
  
    async sendEmail(user, subject) {

      const userToSend = await this.getUserById(user);

      console.log(`=====================================================================`);
      console.log(`send email to user: ${userToSend.email} with subject: ${subject}`);
      console.log(`=====================================================================`);

      return true;
    }
  }
  
  module.exports = new NotificationService();
  