const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const nominationRouter = require('./routes/nomination');
const participantRouter = require('./routes/participant');
const app = express();
const port = process.env.PORT || 5000;

const google = require('./google');
const mongodb = require('./mongodb');
// google.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use(userRouter);
app.use(nominationRouter);
app.use(participantRouter);

// app.get('/api/google', (req, res) => {
//   google.init(res)
// });

app.get('/api/google/nominations', (req, res) => {
  mongodb.getNominations(res);
  res.send('Nominations got');
});

app.get('/api/google/nomination/:id', (req, res) => {
  let nominationsId = req.params.id;

  google.getNomination(res, nominationsId);
});

app.get('/api/google/nomination/name/:id', (req, res) => {
  let nominationsId = req.params.id;

  google.getNominationName(res, nominationsId);
});

app.get('/api/google/photo/:id', async (req, res) => {
  let photoId = req.params.id;
  let photo = await google.getPhoto(photoId);

  res.send(photo);
});

app.get('/api/google/photos/:id', (req, res) => {
  let nominationsId = req.params.id;

  google.getPhotosId(res, nominationsId);
});

app.get('/api/mongo', (req, res) => {
  mongodb.connectDB((item) => console.log(item));
  res.send({ connect: 'fine' });
});

app.get('/api/mongo/createSeason/:id', async (req, res) => {
  let seasonId = req.params.id;
  let season = await mongodb.createSeason(seasonId);
  res.send({ connect: 'fine' });
});

app.get('/api/mongo/season/:id/nominations', async (req, res) => {
  let seasonId = req.params.id;
  let nominations = await mongodb.getNominations(seasonId);

  res.send(nominations);
});

app.get('/api/mongo/season/:id/nomination/:nominationId', async (req, res) => {
  let seasonId = req.params.id;
  let nominationId = req.params.nominationId;
  let nomination = await mongodb.getNomination(seasonId, nominationId);

  res.send(nomination);
});

app.get('/api/mongo/season/:id/participants', async (req, res) => {
  let seasonId = req.params.id;
  let participants = await mongodb.getParticipants(seasonId);

  res.send(participants);
});

app.get('/api/mongo/season/:id/participant/:participantId', async (req, res) => {
  let seasonId = req.params.id;
  let participantId = req.params.participantId;
  let participant = await mongodb.getParticipant(seasonId, participantId);

  res.send(participant);
});

app.get(
  '/api/mongo/season/:id/nomination/:nominationId/participant/:participantId',
  async (req, res) => {
    let seasonId = req.params.id;
    let nominationId = req.params.nominationId;
    let participantId = req.params.participantId;
    let mongoPhoto = await mongodb.getPhoto(seasonId, nominationId, participantId);
    let photo = await google.getPhoto(mongoPhoto.id);
    console.log(photo);

    res.send(photo);
  },
);

app.get('/api/mongo/season/:id/user/:login', async (req, res) => {
  let seasonId = req.params.id;
  let login = req.params.login;
  let user = await mongodb.getUser(seasonId, login);

  res.send(user);
});

app.get('/api/mongo/season/:id/user/:login/:nominationId/:participantId', async (req, res) => {
  let seasonId = req.params.id;
  let login = req.params.login;
  let nominationId = req.params.nominationId;
  let participantId = req.params.participantId;
  let user = await mongodb.getUser(seasonId, login);
  console.log(user.marks[nominationId][participantId]);
  res.send(user.marks[nominationId][participantId]);
});

app.get('/api/mongo/season/:id/user/:login/notmarked', async (req, res) => {
  let seasonId = req.params.id;
  let login = req.params.login;
  let user = await mongodb.getUser(seasonId, login);
  let notmarked = Object.keys(user.marks).map((nomId) => {
    let notMarked = Object.keys(user.marks[nomId]).filter(
      (nom) => nom.idea == null || nom.look == null,
    );
    return {
      nomination: nomId,
      notMarked: notMarked,
    };
  });
  res.send(notmarked);
});

app.get('/', async (req, res) => {
  await res.send('Server is run');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
