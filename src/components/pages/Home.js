import React from 'react';
import '../../App.css';

import UploadFiles from '../Apicalls/upload-files.component'

import '../Background.css';


function Home() {
  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>Data Visualisation</h1>
      <p>In real time!</p>
      <div className='hero-btns'>
        
        <UploadFiles />

      </div>
    </div>
  );
}


export default Home;
