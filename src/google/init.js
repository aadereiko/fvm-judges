import { gapi } from 'gapi';

var CLIENT_ID = '105023151684-0meisbckdgfn5teu4fpqudhvsa6219h0.apps.googleusercontent.com';
var API_KEY = 'AIzaSyCdU3tzPgsSVeM90LTOSCgSZP7pPvT5E4E';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

export function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

export function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    })
    .then(
      function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      },
      function (error) {
        appendPre(JSON.stringify(error, null, 2));
      },
    );
}

function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('sign');
    //   listFiles();
  } else {
    console.log('not sign');
  }
}

export function listFiles() {
  gapi.client.drive.files.list({
    'pageSize': 10,
    'fields': 'nextPageToken, files(id, name)'
  }).then(function (response) {
    appendPre('Files:');
    var files = response.result.files;
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        appendPre(file.name + ' (' + file.id + ')');
      }
    } else {
      appendPre('No files found.');
    }
  });
}