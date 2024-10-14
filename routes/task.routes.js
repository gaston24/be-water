const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');
const NotificationService = require('../services/notification.service');
const TaskListService = require('../services/taskList.service');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json(tasks);
  }
  catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Obtener una tarea por su ID
router.get('/:taskId', async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.taskId);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

    // send notification to all users in task list
    const { userId } = req;

    const taskList = await TaskListService.getTaskListById(req.body.taskListId, userId);

    const users = await taskList.getAllUsers();

    users.forEach(async user => {
      await NotificationService.sendNotification(user.id, 'Task created');
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una tarea
router.put('/:taskId', authMiddleware, async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.taskId, req.body);

    // send notification to all users in task list
    const { userId } = req;

    const taskList = await TaskListService.getTaskListById(req.body.taskListId, userId);

    const users = await taskList.getAllUsers();

    users.forEach(async user => {
      await NotificationService.sendNotification(user.id, 'Task created');
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una tarea
router.delete('/:taskId', async (req, res) => {
  try {
    const message = await taskService.deleteTask(req.params.taskId);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
