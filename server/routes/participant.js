const express = require('express');

const { generateResponse } = require('../services/request');
const Participant = require('../models/participant');

const router = express.Router();

router.get('/api/participants/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send(generateResponse(null, 'Не указан id'));
    }

    const participant = await Participant.findById(id);

    if (!participant) {
      return res.status(404).send(generateResponse(null, 'Номинация не найдена'));
    }

    res.send(generateResponse(participant));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/participants/custom-id/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send(generateResponse(null, 'Не указан id'));
    }

    const participant = await Participant.findOne({ id });

    if (!participant) {
      return res.status(404).send(generateResponse(null, 'Номинация не найдена'));
    }

    res.send(generateResponse(participant));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/api/participants', async (req, res) => {
  try {
    const participants = await Participant.find({});
    res.send(generateResponse(participants || []));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

module.exports = router;
