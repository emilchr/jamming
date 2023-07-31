# Jammming

This React project is a web app connected to Spotify via the Web API. 
The main purpose of this web app is to search for tracks, add them to a playlist, then export the playlist to the users library.

## Technologies used
- React
- HTML
- CSS
- Javascript
- NPM
- Git

## Features
**Connects to the Spotify Web API**
    
Retrieves the access token via the Implicit Grant Flow. 
The access token is used by all the functions in Spotify.js.

**Search**

Search among all of the tracks on Spotify.
    
**Add tracks to the playlist builder**
    
thru search, you will be able to add tracks of your choice to the playlist builder. 
    
**Create a new playlist on Spotify**
    
Connects to Spotify, creates a playlist with the chosen name and adds the tracks.

**Album art**

Shows the album art of the chosen track. This is avalible in TrackList.js. 
Works with Playlist.js and SearchResults.js.

**Audio preview**

An audio preview is avalible for the songs that has a preview url. 

## Functions
### App.js
**addTrack()**
    
Adds track from SearchResults to Playlist.

**removeTrack()**
    
Removes the track from Playlist

**updatePlaylistName()**
    
Updates the *playlistname*.

**savePlaylist()**

Gets the data from *playlistTracks* and *playlistName*. The playlist is created with the value of *playlistName*, and then the data from *playlistTracks* are added to the playlist.
After the playlist has been added it resets the name and tracks. 

**search()**

Makes a query to Spotify and displays the query in SearchResults.

### Track.js
**renderAction()**

Renders a + or a - on the tracks. - renders if the prop *isRemoval* is true and + if *isRemoval* is false.

### Spotify.js
**Spotify.authorize()**

Uses the Implicit Grant Flow to get an access token from the Spotify Web API. The data is stored in localStorage and then in, app.js, it gets stored in a state.
If the token is not stored yet, it redirects to the *authEndpoint*. 

**Spotify.search()**

Fetches data from Spotify Web API and stores it in *data.tracks.items*.

**Spotify.saveUserPlaylist()**

Fetches data from the *userEndpoint*, uses it to determine userID in Spotify, then creates a playlist with *playlistName* as name. It stores the ID of the playlist in *playlistID*. After the playlist is created, the function processes the *tracksURI* from a object to an array in *tracksArray* and adds all the tracks in *tracksArray* to the recently created playlist.


## Testing

- Testing has involved these functions:
  - Login and authorization.
  - Fetch requests in Spotify.js.
  - Adding tracks and removing tracks from the playlist.
  - Adding and removing data to localStorage.


## Known bugs and fixes
- ~Not able to scroll down to view all the tracks in SearchResult and Playlist.(#root overrided body scroll. Disabled body scroll.)~
- ~The first time clicking "Save to Spotify" fails. (Username was not retrieved. Added an asyncronous function.)~
- Search button is not working.
- Preview keeps playing after another preview has been started.
- User icon not loading on first redirect from Spotify Authorization.

## Future features
- [ ] Add a login modal with the Spotify authorization site. 
- [x] Add error/confirmation-logging from functions and fetch requests in the console.
- [ ] Add transitions when adding a track to the Playlist.
- [x] Add support for profile name and profile image to improve UX.
- [x] Add audio preview on tracks.