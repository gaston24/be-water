const express = require('express');
const router = express.Router();
const authService = require('../services/auth.service')

router.post('/login', async (req, res) => {
  const { username, password } = req.body; 
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
    
});

module.exports = router;
 