import React, { useState, useCallback, useEffect } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';



function App() {
  
  const fictionalSearch = [
    {
    name: 'Walk All Over You',
    artist: 'AC/DC',
    album: 'Highway to Hell',
    id: 1,
    uri: '5xquYn2sr3uEcyuKU9BmCJ'},
    {name: 'Thunderstruck',
    artist: 'AC/DC',
    album: 'Razors Edge',
    id: 2,
    uri: '57bgtoPSgt236HzfBOd8kj'},
    {name: 'Stabbing the Drama',
    artist: 'Soilwork',
    album: 'Stabbing the Drama',
    id: 3,
    uri: '4XFykLS5W3LCvEQ5QfU01P'
  } 
];

  // States
  const [searchResults, setSearchResults] = useState(fictionalSearch)
  const [playlistName, setPlaylistName] = useState('New Playlist')
  const [playlistTracks, setPlaylistTracks] = useState([])
  const [accessToken, setAccessToken] = useState('')
    
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
        updatePlaylistName('New Playlist') // changes value of playlistName.

    }
  }

  function search(term) {
    console.log(term);
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