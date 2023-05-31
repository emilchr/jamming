
//CLIENT_ID AND CLIENT_SECRET is neccesary for obtaining the accessToken.
// Using the 'Implicit Grant Flow' to set up a user's account and make requests.
// https://developer.spotify.com/documentation/web-api/concepts/authorization
import { CLIENT_ID } from "./Spotify_creds";

const authEndpoint = 'https://accounts.spotify.com/authorize?'

//const CLIENT_SECRET = '075399c949d94136bdf66582aafb1879';
const REDIRECT_URI ='http://localhost:3000/';
const SCOPES = ['playlist-read-private', 'playlist-modify-private', 'user-read-private' ]

let accessToken = '';
let expiresIn = '';

const Spotify = {

  authorize() {
    const authRedirect = authEndpoint + 'client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&scope=' + SCOPES.join('%20') + '&response_type=token&show_dialog=true';
    
    let params = new URLSearchParams(window.location.hash)
    accessToken = params.getAll('#access_token');
    expiresIn = params.getAll('expires_in');

    localStorage.setItem('token', accessToken)
    localStorage.setItem('expire', expiresIn)
    
    //console.log(accessToken + ' ' + expiresIn)

    if (!localStorage.getItem('token')){

      window.location.href = authRedirect;

    } else{

      accessToken = localStorage.getItem('token');
      expiresIn = localStorage.getItem('expire')
    }
    
  },

search(accessToken, setSearchResults, term) {
  
  const searchEndpoint = 'https://api.spotify.com/v1/search';
  const searchQuery = '?q=' + term;
  const searchType = '&type=track';
  
  const authParams = {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  }

  fetch(searchEndpoint + searchQuery + searchType, authParams)
  .then(result => result.json())
  .then(data => setSearchResults(data.tracks.items))
},

saveUserPlaylist(accessToken, playlistName, playlistTracks) {
  let USER_ID = '';
  //console.log(accessToken)
  const userEndpoint = 'https://api.spotify.com/v1/me';
  const userParams = {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
    // Fetch ID that will be required for creating a playlist
    fetch(userEndpoint, userParams)
    .then(result => result.json())
    .then(data => localStorage.setItem('userID', data.id))
    USER_ID = localStorage.getItem('userID');

    console.log(USER_ID)
    // create playlist
  const playlistEndpoint = 'https://api.spotify.com/v1/users/' + USER_ID + '/playlists';
  const playlistParams = {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": 'application/json'
    },
    body: {
      "name": playlistName
    }
  }
  let playlistID = fetch(playlistEndpoint, playlistParams)
  .then(result => result.json())
  .then(data => data.id)
}
}



export default Spotify;