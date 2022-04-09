// Import Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
// require('dotenv').config();
const youtubeAPIKey = 'AIzaSyDUKFGRrHam1gXo0NI76Q-DCmDV0_b2nfY';

// Create Functional Component
const VideoPlayer = ({drink}) => {

  const [video, setVideo] = useState("");

  useEffect(() => {
    console.log(drink);
    axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=How%20to%20make%20a%20${drink.strDrink}&key=${youtubeAPIKey}`)
      .then((response) => setVideo(response.data.items[0]))
      .catch((error) => console.error(error));
  }, [])

  return (
    <div>
      {(!video) ? <div className='video-player'>Please wait...</div>
      : <div className='video-player'>
        <div className='embed-responsive embed-responsive-16by9'>
          <iframe 
            className='embed-responsive-item' 
            src={`https://www.youtube.com/embed/${video.id.videoId}`} 
            allowFullScreen>
          </iframe>
        </div>
        <div className='video-player-details'>
          <h6>{video.snippet.title}</h6>
        </div>
      </div>}
    </div>
  )
}

export default VideoPlayer;