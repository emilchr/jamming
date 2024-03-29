
//CLIENT_ID AND CLIENT_SECRET is neccesary for obtaining the accessToken.
// Using the 'Implicit Grant Flow' to set up a user's account and make requests.
// https://developer.spotify.com/documentation/web-api/concepts/authorization
import { CLIENT_ID } from "./Spotify_creds";

const authEndpoint = 'https://accounts.spotify.com/authorize?'

const REDIRECT_URI ='https://jammming-emilchr.netlify.app/';
//const REDIRECT_URI ='http://localhost:3000/';
const SCOPES = ['playlist-read-private', 'playlist-modify-public', 'playlist-modify-private', 'user-read-private' ]

let accessToken = '';
let expiresIn = '';

const Spotify = {

  authorize(setAccessToken, setExpiresIn) {
    const authRedirect = authEndpoint + 'client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI + '&scope=' + SCOPES.join('%20') + '&response_type=token&show_dialog=true';
    
    let params = new URLSearchParams(window.location.hash)
    accessToken = params.getAll('#access_token');
    expiresIn = params.getAll('expires_in');

    localStorage.setItem('token', accessToken)
    localStorage.setItem('expire', expiresIn)
    

    if (!localStorage.getItem('token')){

      window.location.href = authRedirect;

    } else {
      // Sets states for accessToken and expiresIn
      setAccessToken(localStorage.getItem('token')) 
      setExpiresIn(localStorage.getItem('expire'))
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
  .then(result => {
    
    if (!result.ok) {
      throw new Error(result.statusText);
    }
    return result.json()
  })
  .then(data => setSearchResults(data.tracks.items))
  .catch(err => console.error('Unable to fetch query. ' + err))
},

async getProfileInfo (setUserName, setUserImage) {
  accessToken = localStorage.getItem('token'); // Gets the token and sets it to the variable, in case of a refresh.
  //console.log(accessToken)
  const userEndpoint = 'https://api.spotify.com/v1/me';
  const userParams = {
    method: 'GET',
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
    // Fetch ID that will be required for creating a playlist
  
    await fetch(userEndpoint, userParams)
    .then(result => {

      if (!result.ok) {

        throw new Error(result.statusText);

      }

      return result.json()

    })
    .then(data => {
      setUserName(data.display_name); // Sets state with username  directly
      setUserImage(data.images[1].url); // Sets state with user image directly
      // localStorage.setItem('userName', data.display_name)
      // localStorage.setItem('userImage', data.images[1].url)
    })
    .catch(err => console.error('Unable to fetch user data. ' + err))
},

async saveUserPlaylist(accessToken, playlistName, playlistTracks) {
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
  
    await fetch(userEndpoint, userParams)
    .then(result => {

      if (!result.ok) {

        throw new Error(result.statusText);

      }

      return result.json()

    })
    .then(data => localStorage.setItem('userID', data.id))
    .catch(err => console.error('Unable to fetch userID. ' + err))
 
    USER_ID = localStorage.getItem('userID');

    // create playlist
  const playlistEndpoint = 'https://api.spotify.com/v1/users/' + USER_ID + '/playlists';
  const playlistParams = {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      "name": playlistName
    })
  }

  // Fetches the playlistID and stores it in the variable playlistID.
  let playlistID = await fetch(playlistEndpoint, playlistParams)
  .then(result => {
    
    if (!result.ok) {

      throw new Error(result.statusText);

    }
    return result.json()
  })
  .then(data => data.id)
  .catch(err => console.error('Unable to fetch playlistID. ' + err))
  
  // logging
  if (playlistID) {

    console.log('Playlist is created with ID: ' + playlistID)

  } 

  // Add tracks to the playlist
  //
  // Proccess playlistTracks to an array. The array is needed for the api request.
  const trackURIs = playlistTracks.map(track => track.uri);
  const tracksArray = Object.values(trackURIs);


  const addTrackEndpoint = 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks';
  const addTrackParams = {
    method: 'POST',
    headers: {
      "Authorization": "Bearer " + accessToken,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      "uris": tracksArray,
    })
  }

  // connect to Spotify Web API and add tracks to playlistID
  fetch(addTrackEndpoint, addTrackParams)
  .then(result => {
    
    if (!result.ok) {

      throw new Error(result.statusText);

    } else {
      
      console.log('Tracks were added to playlist: ' + playlistName)
      
    }
    return result.json()
  })
  .catch(err => console.error('Unable to add tracks to playlist. ' + err))
}
}



export default Spotify;