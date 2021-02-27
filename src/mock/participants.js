let participantsAmount = 0;
const desiredAmount = 100;
export const PARTICIPANTS = [];

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const generateParticipant = () => ({
  id: participantsAmount++,
  nominations: {
    1: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    2: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    3: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    4: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    5: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    6: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
    7: {
      mark: getRandomInt(10),
      img:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ed_Sheeran_3%2C_2013.jpg/800px-Ed_Sheeran_3%2C_2013.jpg',
    },
  },
});

const generateParticipants = () => {
  for (let i = 0; i < desiredAmount; i++) {
    PARTICIPANTS.push(generateParticipant());
  }
};

generateParticipants();
