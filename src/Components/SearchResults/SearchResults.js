import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults(props) {
  return (
    <div className="SearchResults">
        <h2>Results</h2>
        <TrackList 
          tracks={props.searchResults} 
          togglePlaying={props.togglePlaying}
          playing={props.playing} 
          onAdd={props.onAdd} 
          isRemoval={false} 
        />
        {
        //console.log(props.searchResults) Delivers correct preview_url from object
        }
    </div>
  )
}

export default SearchResults