const google = require('./google');
const mongodb = require('./mongodb');

const create = async (seasonId) => {
  const season = await mongodb.createSeason(seasonId);
  const nominations = await setNominations(seasonId);
  const adminUser = await setParticipants(seasonId, nominations);
  console.log('fine');
};

function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

const setNominations = async (seasonId) => {
  const nominationsInfo = await google.getNominations(seasonId);
  const data = await Promise.all(
    nominationsInfo.map(async (nominationInfo) => {
      const nomination = await google.getNomination(nominationInfo.driveId);

      const photos = [];
      for (const photoId of nomination.photosId) {
        const photo = await google.getPhoto(photoId);
        await delay(500);
        photos.push(photo);
      }
      await mongodb.addDocumentToCollection(seasonId, 'nominations', {
          name: nominationInfo.name,
          id: nominationInfo.id,
          photos: photos
      })
      return {
        name: nominationInfo.name,
        id: nominationInfo.id,
        photos: photos,
      };
    }),
  );

  return data;
};

const setParticipants = async (seasonId, nominations) => {
  let participants = {};
  let marks = {};

  nominations.map((nomination) => {
    nomination.photos.map((photo) => {
      let participantName = +photo.name.split('.jpg')[0].split('_')[0];
      if (!participants[participantName]) {
        participants[participantName] = {
          id: participantName,
          nominations: {},
        };
      }
      if (!participants[participantName].nominations[nomination.id]) {
        participants[participantName].nominations[nomination.id] = {
          name: nomination.name,
          photo: [],
        };
      }
      participants[participantName].nominations[nomination.id].photo.push(photo);
      if (!marks[nomination.id]) marks[nomination.id] = {};
      marks[nomination.id][participantName] = {
        idea: 0,
        look: 0,
      };
    });
  });
  // let user = await mongodb.addDocumentToCollection(seasonId, 'users', marks);
  let data = await Promise.all(Object.keys(participants).map(async participantId => {
      let participant = await mongodb.addDocumentToCollection(seasonId, 'participants', participants[participantId]);

      return participant;
  }))

  const adminUser = await setUser(seasonId, marks, 'admin', 'Admin', 'admin');
  const judgeUser = await setUser(seasonId, marks, 'user', 'Пользователь с какими-то оценками', 'judge');
  const sanyaUser = await setUser(seasonId, marks, 'aadereiko', 'Александр Адерейко', 'judge');

  return data;
};

const setUser = async (seasonId, marks, username, name, role) => {
  let user = {
    username,
    role,
    name,
    marks: marks,
  };

  let newUser = await mongodb.addDocumentToCollection(seasonId, 'users', user);

  return newUser;
};
create('1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk');
