import React, { useState, useCallback, useEffect } from 'react';

import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Profile from '../Profile/Profile';

import Spotify from '../../util/Spotify';



function App() {
  
  // States
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('Enter Playlist Name');
  const [playlistTracks, setPlaylistTracks] = useState([]); // Playlist ready to be synced
  const [accessToken, setAccessToken] = useState(''); // Saves accessToken 
  const [expiresIn, setExpiresIn] = useState(''); // Saves expiresIn 
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  // end of states

    // Get API Access Token and set it to the state "accessToken". 
    useEffect(() => {
      
      //Spotify.authorize();
      
      //Spotify.getToken(accessToken, setAccessToken, setExpiresIn)
      setAccessToken(localStorage.getItem('token'))
      setExpiresIn(localStorage.getItem('expire'))
      Spotify.getProfileInfo()
      
      setUserName(localStorage.getItem('userName'))
      setUserImage(localStorage.getItem('userImage'))
      
      // clean up url
      setInterval(() => {
        window.location.hash = ''
      }, 100);
      
    }, [])
      
  const addTrack = useCallback(
    (track) => {
      if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) 
        return;

      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
      console.log('Track added. Track: ' + track.artists[0].name +  ' - ' + track.name);
    },
    [playlistTracks]
  );

  const removeTrack = useCallback(
    (track) => {   
      setPlaylistTracks(playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id));
      console.log('Track removed. Track: ' + track.artists[0].name +  ' - ' + track.name);
      }, 
      [playlistTracks])

  function updatePlaylistName(name) {

    setPlaylistName(name);

  }
 
  useEffect(() => { // resets playlistName in value on mounting.

    document.getElementById('field').value = playlistName;
    
  }, [playlistName])

  
  const savePlaylist = () => {
    
    if (accessToken === null) {
      console.error('There is no Access Token avalible.')
    } 

    if (playlistTracks.length === 0){ // Does not update if there are no tracks added

      console.error('No tracks in the playlist.')

    } else {
        
        Spotify.saveUserPlaylist(accessToken, playlistName, playlistTracks);

        //  Resets playlist states
        setPlaylistTracks([]); // resets tracks in playlistTracks.
        updatePlaylistName('Enter Playlist Name') // resets the value of playlistName.

        console.log('Playlist name is reset.');
        console.log('Tracks in playlist is reset.');
    }
  }

   const search = (term) => {
    Spotify.search(accessToken, setSearchResults, term)
    //console.log(searchResults)
  } 

  return (
    <div> 
      <div className="App">
      <div className='header'>
        <h1>Ja<span className="highlight">mmm</span>ing </h1>
        <div className='right'>
          <Profile userName={userName} userImage={userImage} />
          </div>
      </div>
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
