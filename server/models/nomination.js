const mongoose = require('mongoose');

const nominationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
  },
  photos: [
    {
      name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
        unique: true,
      },
      id: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

const Nomination = mongoose.model('nominations', nominationSchema);

module.exports = Nomination;
