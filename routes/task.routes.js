const express = require('express');
const router = express.Router();
const taskService = require('../services/task.service');

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

router.post('/', async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar una tarea
router.put('/:taskId', async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(req.params.taskId, req.body);
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
