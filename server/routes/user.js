const User = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');

const { generateResponse } = require('../services/request');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/api/users', auth, async (req, res) => {
  const user = new User(req.body);

  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).send(generateResponse(null, 'Нет прав создавать пользователей'));
  }

  try {
    await user.save();
    res.status(201).send(generateResponse(user));
  } catch (e) {
    res.status(500).send(generateResponse(null, e));
  }
});

router.delete('/api/users/:id', auth, async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send(generateResponse(null, 'Id не указан'));
    }

    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).send(generateResponse(null, 'Нет прав удалять пользователей'));
    }

    const userToDelete = await User.findByIdAndDelete(id);

    if (!userToDelete) {
      return res.status(404).send(generateResponse(null, 'Пользователь не найден'));
    }

    res.send(generateResponse(userToDelete, null, 'Пользователь успешно удален'));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/users/me', auth, async (req, res) => {
  try {
    res.send(generateResponse(req.user));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.post('/api/users/auth', async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).send(generateResponse(null, 'Не указан username'));
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send(generateResponse(null, 'Пользователь не найден'));
    }

    const token = await user.generateAuthToken();
    res.send(generateResponse({ user, token }));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/users', auth, async (req, res) => {
  try {
    if (!req.user || req.user.role === 'admin') {
      return res.status(401).send(generateResponse(null, 'Нет прав смотреть список пользователей'));
    }

    const users = await User.find({});

    res.send(generateResponse(users || []));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

module.exports = router;
