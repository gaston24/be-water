const express = require('express');
const router = express.Router();
const taskListService = require('../services/taskList.service');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', async (req, res) => {
  try {
    const taskList = await taskListService.createTaskList(req.body);
    res.status(201).json(taskList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:taskListId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const taskList = await taskListService.getTaskListById(req.params.taskListId, userId);
    res.status(200).json(taskList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId } = req;
    const taskLists = await taskListService.getAllTaskLists(userId);
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


router.post('/share/:taskListId/:sharedToId', authMiddleware, async (req, res) => {
  const { userId } = req;
  const { taskListId, sharedToId } = req.params;
  try {
    const result = await taskListService.shareTaskList(taskListId, userId, sharedToId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/share/:taskListId/:sharedToId', authMiddleware, async (req, res) => {
  const { taskListId, sharedToId } = req.params;
  try {
    const result = await taskListService.removeShare(taskListId, sharedToId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


module.exports = router;
