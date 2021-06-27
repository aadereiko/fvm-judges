const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  id: {
    // type: Number,
    // required: true,
  },
  name: {},
  nominations: {},
});

const Participant = mongoose.model('participants', participantSchema);

module.exports = Participant;
