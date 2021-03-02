const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

const google = require('./google');
// google.init();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.get('/api/google', (req, res) => {
  google.init(res)
});

app.get('/api/google/nominations', (req, res) => {
  google.getNominations(res)
});

app.get('/api/google/nomination', (req, res) => {
  let nominationsId = req.query.nom;
  
  google.getNomination(res, nominationsId);
});

app.get('/api/google/photo', (req, res) => {
  let photoId = req.query.photoId;
  
  google.getPhoto(res, photoId);
})

app.get('/api/google/photos', (req, res) => {
  let nominationsId = req.query.nom;
  
  google.getPhotosId(res, nominationsId);
})

app.listen(port, () => console.log(`Listening on port ${port}`));

