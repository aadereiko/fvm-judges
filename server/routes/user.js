const User = require('../models/user');
const express = require('express');
const jwt = require('jsonwebtoken');

const { generateResponse } = require('../services/request');
const auth = require('../middleware/auth');
const { initJudgeMarks } = require('../helpers/user');
const router = express.Router();

router.post('/api/users', auth, async (req, res) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(401).send(generateResponse(null, 'Нет прав создавать пользователей'));
  }

  const user = new User(req.body);

  try {
    if (user.role === 'judge') {
      await initJudgeMarks(user);
    }
    await user.save();
    res.status(201).send(generateResponse(user, null, 'Член жюри успешно создан'));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
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

    const user = await User.findOne({ username: req.body.username }).select('-marks');
    if (!user) {
      return res.status(404).send(generateResponse(null, 'Пользователь не найден'));
    }

    const token = await user.generateAuthToken();
    res.send(generateResponse({ user, token }, null, 'Вы успешно вошли в систему'));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/users', auth, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).send(generateResponse(null, 'Нет прав смотреть список пользователей'));
    }

    const isWithoutMarks = req.query.noMarks === 'true';
    const users = await User.find({}).select(`${(isWithoutMarks && '-marks') || ''}`);

    res.send(generateResponse(users || []));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/users/:id', auth, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(401).send(generateResponse(null, 'Нет прав смотреть пользователя'));
    }

    const id = req.params.id;

    if (!id) {
      return res.status(400).send(generateResponse(null, 'Id не указан'));
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send(generateResponse(null, 'Пользователь не найден'));
    }

    return res.send(generateResponse(user));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.put('/api/user/:id/:nomId/:partId', auth, async (req, res) => {
  try {
    const id = req.params.id;
    const nomId = req.params.nomId;
    const partId = req.params.partId;

    const user = await User.findOne({ username: id });
    user.marks[nomId][partId][req.body.type] = req.body.mark;
    const userUpdate = await User.updateOne({username: id}, {$set: { 'marks': user.marks }});

    res.send(user.marks[nomId][partId]);

  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

module.exports = router;
