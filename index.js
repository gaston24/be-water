require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const { sequelize } = require('./models');

app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await sequelize.authenticate();
  console.log('Database connected!');
});
