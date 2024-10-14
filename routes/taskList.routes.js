const express = require('express');
const router = express.Router();
const taskListService = require('../services/taskList.service');

router.post('/', async (req, res) => {
  try {
    const taskList = await taskListService.createTaskList(req.body);
    res.status(201).json(taskList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:taskListId', async (req, res) => {
  try {
    const taskList = await taskListService.getTaskListById(req.params.taskListId);
    res.status(200).json(taskList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const taskLists = await taskListService.getAllTaskLists();
    res.status(200).json(taskLists);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/:taskListId', async (req, res) => {
  try {
    const updatedTaskList = await taskListService.updateTaskList(req.params.taskListId, req.body);
    res.status(200).json(updatedTaskList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:taskListId', async (req, res) => {
  try {
    const message = await taskListService.deleteTaskList(req.params.taskListId);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});


module.exports = router;
