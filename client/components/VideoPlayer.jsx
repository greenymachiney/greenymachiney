// Import Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Create Functional Component
const VideoPlayer = ({drink}) => {

  const [video, setVideo] = useState("");

  useEffect(() => {
    console.log(video);
    // let searchInput = video
    // console.log(drink);
    axios.get(`/youtube/${drink.strDrink}`)
      .then((response) => setVideo(response.data))
      .catch((err) => console.error(err));
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