require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const taskListRoutes = require('./routes/taskList.routes');
const authRoutes = require('./routes/auth.routes');

app.use(express.json());
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/task-lists', taskListRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
