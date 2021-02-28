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
        'https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/07/work-a-location-dps-1.jpg?fit=1500%2C1000&ssl=1',
    },
    3: {
      mark: getRandomInt(10),
      img:
        'https://media.cntraveler.com/photos/5e320e3c0615da0008a91748/master/pass/HowIGotThisShot-AndyMann-2020.jpg',
    },
    4: {
      mark: getRandomInt(10),
      img: 'https://independenttravelcats.com/wp-content/uploads/2018/02/2-1.jpg',
    },
    5: {
      mark: getRandomInt(10),
      img:
        'https://i2.wp.com/digital-photography-school.com/wp-content/uploads/2019/05/iPhone_sandra_roussy-image-09.jpg?resize=1500%2C1125&ssl=1',
    },
    6: {
      mark: getRandomInt(10),
      img:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv0I66CiTG521SPkJr-CkWgn7WXcn9Jn_t9A&usqp=CAU',
    },
    7: {
      mark: getRandomInt(10),
      img:
        'https://i.guim.co.uk/img/media/54ca26399fccabde9d52ae589be93ecad85c676e/282_361_5222_3134/master/5222.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e0067e4eb79b6e3ea8d74125162225a0',
    },
  },
});

const generateParticipants = () => {
  for (let i = 0; i < desiredAmount; i++) {
    PARTICIPANTS.push(generateParticipant());
  }
};

generateParticipants();
