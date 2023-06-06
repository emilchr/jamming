# Jammming

This project is a web app connected to Spotify via the WebAPI. 
The main purpose of this web app is to search for tracks, add them to a playlist, then save the playlist to the users library.

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

## Functions
### App.js
**addTrack()**
    
e

**removeTrack()**
    
e

**updatePlaylistName()**
    
e

**savePlaylist()**

e

**search()**

e

### Track.js
**renderAction()**

e

### Spotify.js
**Spotify.authorize()**

e

**Spotify.search()**

e

**Spotify.saveUserPlaylist()**

e


## Testing

- Testing involves functions:
  - Fetch requests in Spotify.js
  - Login and authorization

## Known bugs and fixes

- [ ] Add a login screen 
- [ ] Add transitions to TrackList.css.