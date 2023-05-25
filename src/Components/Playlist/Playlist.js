import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
  function handleNameChange(e) { // Handles the renaming of a playlist
    props.onNameChange(e.target.value);
  }


    return (
    <div className="Playlist">
            <input id='field' defaultValue={props.playlistName} onChange={handleNameChange} /> 
            <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
            <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
    </div>
  )
}

export default Playlist