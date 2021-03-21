const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { generateResponse } = require('../services/request');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'fvmisthebest');
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send(generateResponse(null, 'Пожалуйста, войдите в систему'));
  }
};

module.exports = auth;
