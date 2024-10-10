const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');

router.post('/', async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
});

module.exports = router;
