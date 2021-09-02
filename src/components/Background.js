import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Background.css';

function Background() {
  return (
    <div className='hero-container'>
      <video src='/videos/video.mp4' autoPlay loop muted />
      <h1>Data Visualisation</h1>
      <p>In real time!</p>
      <div className='hero-btns'>
        {}
      </div>
    </div>
  );
}

export default Background;
