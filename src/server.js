const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const google = require('./google');
const mongodb = require('./mongodb');
// google.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

// app.get('/api/google', (req, res) => {
//   google.init(res)
// });

app.get('/api/google/nominations', (req, res) => {
  google.getNominations(res)
});

app.get('/api/google/nomination/:id', (req, res) => {
  let nominationsId = req.params.id;
  
  google.getNomination(res, nominationsId);
});

app.get('/api/google/nomination/name/:id', (req, res) => {
  let nominationsId = req.params.id;
  
  google.getNominationName(res, nominationsId);
});

app.get('/api/google/photo/:id', (req, res) => {
  let photoId = req.params.id;
  
  google.getPhoto(res, photoId);
})

app.get('/api/google/photos/:id', (req, res) => {
  let nominationsId = req.params.id;

  google.getPhotosId(res, nominationsId);
})

app.get('/api/mongo', (req, res) => {
  mongodb.connectDB(item => console.log(item))
  res.send({connect: "fine"})
});

app.get('/api/mongo/createSeason/:id', async (req, res) => {
  let seasonId = req.params.id;
  
  let season = await mongodb.createSeason(seasonId)
  res.send({connect: "fine"})
});

app.listen(port, () => console.log(`Listening on port ${port}`));

