class NotificationService {
    static sendNotification(user, message) {
      console.log(`send notification to user: ${user}: ${message}`);
    }
  
    static sendEmail(user, subject) {
      console.log(`send email to user: ${user} with subject: ${subject}`);
    }
  }
  
  module.exports = NotificationService;
  