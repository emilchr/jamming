import React from 'react';

import './Profile.css';


const Profile = (props) => {



  return (
    <div className='profile-container'>
        <div className='profile-name'>{props.userName}</div>
        <div className='profile-image'>
            <img alt={props.userName} src={props.userImage} ></img>
        </div>
    </div>
  )
}

export default Profile