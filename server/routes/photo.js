const express = require('express');

const { generateResponse } = require('../services/request');
const Nomination = require('../models/nomination');
const google = require('../google');

const router = express.Router();

router.get('/api/photos/custom-id', async (req, res) => {
  // params
  //  nominationId
  //  participantId
  try {
    const { nominationId, participantId } = req.query;

    if (!nominationId || !participantId) {
      return res.status(400).send(generateResponse(null, 'Не указаны id'));
    }

    const nomination = await Nomination.findOne({ id: +nominationId });
    if (!nomination) {
      return res.status(404).send(generateResponse(null, 'Номинация не найдена'));
    }

    const mongoPhoto = nomination.photos.filter(
      (photo) => photo.name.split('_')[0] == participantId,
    )[0];
    const photo = await google.getPhoto(mongoPhoto.id);
    photo.participant = photo.name;
    photo.name = participantId;
    res.send(
      generateResponse({
        photo,
        nomination,
      }),
    );
  } catch (e) {
    res.status(500).send(generateResponse(null, e.message));
  }
});

module.exports = router;
