const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';
let response;
// Load client secrets from a local file.
function init(res, callback) {
    response = res;
    fs.readFile('credentials.json', (err, content) => {
      if (err) return console.log('Error loading client secret file:', err);
      // Authorize a client with credentials, then call the Google Drive API.
      // authorize(JSON.parse(content), listFiles);
      authorize(JSON.parse(content), callback || listFiles);
    });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
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

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
async function listFiles(auth) {
  const drive = google.drive({version: 'v2', auth});
  const folders = await drive.children.list({
      folderId: '1MmjutDdTs1b96J1KNRVmZszcmADMVE9z'
  })
  folders.data.items.forEach(async item => {
    const folder = await drive.files.get({
      fileId: item.id
    })
    console.log(folder.data.title);
  })
  response.send({answer: 'fine'})
}

function getNominations(res) {
  init(res, async function (auth) {
    const drive = google.drive({version: 'v2', auth});

    const folders = await drive.children.list({
        folderId: '1MmjutDdTs1b96J1KNRVmZszcmADMVE9z'
    })

    let nominations = [];

    // folders.data.items.forEach(async item => {
    //   const folder = await drive.files.get({
    //     fileId: item.id
    //   })
    //   // console.log(folder.data.title);
    // })
    
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
    res.send({nominations})
  })
}

function getPhoto(res, photoId) {
  
}



module.exports.init = init;
module.exports.getNominations = getNominations;