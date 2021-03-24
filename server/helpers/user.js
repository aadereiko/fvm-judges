const Nomination = require('../models/nomination');
const Participant = require('../models/participant');

const initJudgeMarks = async (user) => {
  const nominationIds = (await Nomination.find({}).select('id')).map(({ id }) => id);
  const participantIds = (await Participant.find({}).select('id')).map(({ id }) => id);

  nominationIds.forEach((nominationId) => {
    participantIds.forEach((participantId) => {
      if (!user.marks) {
        user.marks = {};
      }

      if (!user.marks[nominationId]) {
        user.marks[nominationId] = {};
      }

      user.marks[nominationId][participantId] = {
        idea: 0,
        look: 0,
      };
    });
  });
};

module.exports = {
  initJudgeMarks,
};
