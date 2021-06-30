const google = require('./google');
const mongodb = require('./mongodb');
let numbers = {};
let count = 1;


const getParticipantId = (name) => {
  if (!numbers[name]) {
    numbers[name] = `${count}`;
    count += 1;
    return numbers[name];
  } else {
    return numbers[name]
  }
}

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
        photo.participant = photo.name;
        photo.name = getParticipantId(photo.name.split('.jpg')[0].split('.JPG')[0].split('_')[0]);
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
      let participantName = photo.participant.split('.jpg')[0].split('.JPG')[0].split('_')[0];
      
      if (!participants[getParticipantId(participantName)]) {
        participants[getParticipantId(participantName)] = {
          id: getParticipantId(participantName),
          name: participantName,
          nominations: {},
        };
        count++;
      }

      if (!participants[getParticipantId(participantName)].nominations[nomination.id]) {
        participants[getParticipantId(participantName)].nominations[nomination.id] = {
          name: nomination.name,
          photo: [],
        };
      }

      participants[getParticipantId(participantName)].nominations[nomination.id].photo.push(photo);

      if (!marks[nomination.id]) marks[nomination.id] = {};
      marks[nomination.id][getParticipantId(participantName)] = {
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
  const user1 = await setUser(seasonId, marks, 'aadereiko', 'Александр Адерейко', 'judge');
  const user2 = await setUser(seasonId, marks, 'pidor', 'Марика и Даша', 'judge');
  const user3 = await setUser(seasonId, marks, 'Maksim', 'Максим МВО', 'judge');
  const user4 = await setUser(seasonId, marks, 'patut', 'Андрей и Аня', 'judge');
  const user5 = await setUser(seasonId, marks, 'promo', 'Павел Барановский', 'judge');
  const user6 = await setUser(seasonId, marks, 'winner', 'Яна Иванова', 'judge');
  const user7 = await setUser(seasonId, marks, 'piccha', 'Кристина Ядловская', 'judge');
  const user8 = await setUser(seasonId, marks, 'boss', 'Ренат Мухиянов', 'judge');
  const user9 = await setUser(seasonId, marks, '4s', 'Светлана 4S', 'judge');
  const user10 = await setUser(seasonId, marks, 'mister2016', 'Максим Русецкий', 'judge');

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
create('1GPQ7o4Xj55lXBnK0OnpYruwMQ6ZCuCk3');
