import React, {useState} from 'react';
import './Track.css';


function Track(props) {

  const [playing, setPlaying] = useState(false);

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

  

  const audioPreviewButton = () => {
    

    if (props.track.preview_url === null) {
      return (
      
      <button onClick={function(){console.log("No preview avalible")}} style={{cursor: 'default'}}> </button>
      
      )
    } else {
      return (
      <div>
        <button id="play-button" onClick={ function(){
          
          if (document.getElementById(props.track.preview_url).paused) {
            
            document.getElementById(props.track.preview_url).play()
            
            setPlaying(true); // sets the state setPlaying to true. This affects the play/pause button
            document.getElementById(props.track.preview_url).addEventListener('ended', () => setPlaying(false)) // listening for track to stop playing 
            console.log(props.track.preview_url)
           } else { 
            
            document.getElementById(props.track.preview_url).pause()
            
            setPlaying(false);// sets the state setPlaying to false. This affects the play/pause button
          }
          
          } }
          >
            {playing && props.track.preview_url ? "||" : "▶"}
            </button>
      </div>
      )
    }
  }    
    
  return (
    <div className="Track">
          <div className="Track-information">
          <div className='image-container'>
          <img src={props.track.album.images[0].url} alt={props.track.album.name}></img>
          {
            <audio id={props.track.preview_url}>
              {
                props.track.preview_url === null ? 
                "" : 
                <source src={props.track.preview_url} type="audio/mpeg"></source>
              }
            No support
            </audio> 
          }
      
          {audioPreviewButton()}
          
          </div>
            <h3>{props.track.name}</h3>
            <p>{props.track.artists[0].name} | {props.track.album.name}</p>
          </div>
          {renderAction()}
      </div>
  )
}

export default Track