import React, { useState, useCallback, useEffect } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';



function App() {
  
  // States
  const [searchResults, setSearchResults] = useState([])
  const [playlistName, setPlaylistName] = useState('Enter Playlist Name')
  const [playlistTracks, setPlaylistTracks] = useState([]) // Playlist ready to be synced
  const [accessToken, setAccessToken] = useState('') // Saves accessToken 
    
    // Get API Access Token and set it to the state "accessToken".
    useEffect(() => {
       
      Spotify(setAccessToken)

    }, [])
      
  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) 
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback(
    (track) => {   
      setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id));
      }, 
      [playlistTracks])

  function updatePlaylistName(name) {

    setPlaylistName(name);

  }
 
  useEffect(() => { // resets playlistName in value on mounting.

    document.getElementById('field').value = playlistName

  }, [playlistName])

  function savePlaylist() {
    
    if (playlistTracks.length === 0){ // Does not update if there are no tracks added

      console.error('No tracks in the playlist')

    } else {

        const trackURIs = playlistTracks.map(track => track.uri);
        const newPlaylistName = playlistName;

        console.log(trackURIs);
        console.log('Playlist name: ' + newPlaylistName);

        setPlaylistTracks([]);
        updatePlaylistName('Enter Playlist Name') // resets the value of playlistName.

    }
  }

  function search(term) {
    console.log(term);
    
    const searchEndpoint = 'https://api.spotify.com/v1/search';
    const searchQuery = '?q='+term;
    const searchType = '&type=track';
    
    const authParams = {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + accessToken,
      }
    }

    fetch(searchEndpoint + searchQuery + searchType, authParams)
    .then(result => result.json())
    .then(data => setSearchResults(data.tracks.items))
    //console.log(searchResults)
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
         <SearchBar onSearch={search} />
        <div className="App-playlist">
          
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
          />

          <Playlist 
            playlistName={playlistName} 
            playlistTracks={playlistTracks} 
            onRemove={removeTrack} 
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  )
}

export default App