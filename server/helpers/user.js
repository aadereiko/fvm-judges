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

const findNextPhoto = (marks) => {
  let isNextFound = false;
  let next = null;
  const nominationIds = Object.keys(marks);

  if (nominationIds && nominationIds.length) {
    for (let i = 0; i < nominationIds.length; i++) {
      if (isNextFound) {
        break;
      }

      const participantsOfNomination = marks[nominationIds[i]];
      const participantIds = Object.keys(participantsOfNomination);

      if (participantIds && participantIds.length) {
        for (let j = 0; j < participantIds.length; j++) {
          // there are no photos
          if (!participantsOfNomination[participantIds[j]]) {
            continue;
          } else if (
            !participantsOfNomination[participantIds[j]].idea ||
            !participantsOfNomination[participantIds[j]].look
          ) {
            isNextFound = true;
            next = {
              nominationId: nominationIds[i],
              participantId: participantIds[j],
            };
          }

          if (isNextFound) {
            break;
          }
        }
      }
    }
  }

  return next;
};

const getSumsOfUsers = (users) => {
  const participantSums = {};
  if (users && users.length) {
    const allMarks = users.map(({ marks }) => marks);
    const nominationIds = Object.keys(allMarks[0]);
    for (let i = 0; i < allMarks.length; i++) {
      const userMarks = allMarks[i];

      nominationIds.forEach((nominationId) => {
        Object.keys(userMarks[nominationId]).forEach((participantId) => {
          let isFinished = true;

          if (!participantSums[participantId]) {
            participantSums[participantId] = {
              isFinished: true,
            };
          }

          if (!participantSums[participantId][nominationId]) {
            participantSums[participantId][nominationId] = {
              idea: 0,
              look: 0,
            };
          }

          const currentMark = userMarks[nominationId][participantId];
          const currentParticipantNomination = participantSums[participantId][nominationId];

          if (currentMark) {
            if (!currentMark.look || !currentMark.idea) {
              isFinished = false;
            }

            currentParticipantNomination.look += currentMark.look || 0;
            currentParticipantNomination.idea += currentMark.idea || 0;

            if (participantSums[participantId].isFinished) {
              participantSums[participantId].isFinished = isFinished;
            }
          }
        });
      });
    }
  }

  return participantSums;
};
module.exports = {
  initJudgeMarks,
  findNextPhoto,
  getSumsOfUsers,
};
