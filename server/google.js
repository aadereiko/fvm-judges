const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly', 'https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = 'token.json';

const readFile = (path, errMsg, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) {
        console.log(errMsg);
        reject(err)
      }
      else resolve(data)
    })
  })


async function init(callback) {
  const content = await new Promise((resolve, reject) => {
    fs.readFile('./credentials.json', 'utf8', (err, data) => {
      if (err) {
        console.log('Error loading client secret file:', err);
        reject(err)
      }
      else resolve(data)
    })
  })

  const data = await authorize(JSON.parse(content), callback);

  // console.log(0, data);
  return data;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  const token = await new Promise((resolve, reject) => {
    fs.readFile(TOKEN_PATH, 'utf8', async (err, data) => {
      if (err) {
        const callbackData = await getAccessToken(oAuth2Client, callback);
        reject(callbackData)
      }
      else resolve(data)
    })
  })

  // const data = await fs.readFile(TOKEN_PATH, async (err, token) => {
  //   if (err) {
  //     const callbackData = await getAccessToken(oAuth2Client, callback);

  //     return callbackData
  //   }
  //   console.log(3, callbackData);
  //   return callbackData
  // });
  oAuth2Client.setCredentials(JSON.parse(token));
  const data = await callback(oAuth2Client);

  // console.log(1, data);
  return data;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

async function getNominations(id) {
  const nominationsInfo = await init(async function (auth) {
    const drive = google.drive({ version: 'v2', auth });

    const folders = await drive.children.list({
      folderId: id
    })

    let nominations = [];

    for (const [index, item] of folders.data.items.entries()) {
      const folder = await drive.files.get({
        fileId: item.id
      })
      nominations.push({
        name: folder.data.title,
        id: index,
        driveId: item.id
      })
    }

    // res.send({ nominations })
    // console.log(3, nominations)
    return nominations;
  })

  // console.log(2, nominationsInfo)
  return nominationsInfo;
}

async function getPhoto(photoId) {
  const data = await init(async function (auth) {
    const drive = google.drive({ version: 'v2', auth });
    const photoName = await drive.files.get({
      fileId: photoId
    }).then().catch(err => console.log(err));

    return { name: photoName.data.title, link: photoName.data.thumbnailLink, id: photoId }
  })

  return data;
}

async function getNomination(nominationId) {
  const data = await init(async function (auth) {
    const drive = google.drive({ version: 'v2', auth });

    const folder = await drive.files.get({
      fileId: nominationId
    })

    const photos = await drive.children.list({
      folderId: nominationId
    })

    let photosId = await Promise.all(photos.data.items.map(photo => photo.id));

    return { name: folder.data.title, photosId }
  });

  return data;
}

async function getNominationName(nominationId) {
  const data = await init(async function (auth) {
    const drive = google.drive({ version: 'v2', auth });

    const folder = await drive.files.get({
      fileId: nominationId
    })

    // res.send({ name: folder.data.title })
    return { name: folder.data.title }
  });

  return data;
}

async function getPhotosId(res, nominationId) {
  init(res, async function (auth) {
    const drive = google.drive({ version: 'v2', auth });

    const photos = await drive.children.list({
      folderId: nominationId
    })

    let photosId = photos.data.items.map(photo => photo.id);
    res.send({ photosId })
  });
}

module.exports.init = init;
module.exports.getNominations = getNominations;
module.exports.getNomination = getNomination;
module.exports.getNominationName = getNominationName;
module.exports.getPhoto = getPhoto;
module.exports.getPhotosId = getPhotosId;