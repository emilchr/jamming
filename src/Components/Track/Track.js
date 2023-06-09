import React from 'react';
import './Track.css';


function Track(props) {
  function addTrack() {
    props.onAdd(props.track);
  }
  function removeTrack() {
    props.onRemove(props.track);
  }
  function renderAction() {
    // isRemoval is connected to what??? step 27
   if (props.isRemoval) {

     return <button className="Track-action" onClick={removeTrack} > - </button>

   } else {

     return <button className="Track-action"  onClick={addTrack}> + </button>
     
   }
  }
 
  return (
    <div className="Track">
          <div className="Track-information">
          <div className='image-container'>
            <img src={props.track.album.images[0].url} alt={props.track.album.name}></img>
          </div>
            <h3>{props.track.name}</h3>
            <p>{props.track.artists[0].name} | {props.track.album.name}</p>
          </div>
          {renderAction()}
      </div>
  )
}

export default Track