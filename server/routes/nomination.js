const express = require('express');

const { generateResponse } = require('../services/request');
const Nomination = require('../models/nomination');

const router = express.Router();

router.get('/nominations/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send(generateResponse(null, 'Не указан id'));
    }

    const nomination = await Nomination.findById(id);

    if (!nomination) {
      return res.status(404).send(generateResponse(null, 'Номинация не найдена'));
    }

    res.send(generateResponse(nomination));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

router.get('/nominations', async (req, res) => {
  try {
    const nominations = await Nomination.find({});
    res.send(generateResponse(nominations || []));
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

module.exports = router;
