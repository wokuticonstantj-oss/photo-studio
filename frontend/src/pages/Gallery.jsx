import React, { useState } from 'react';

const Gallery = () => {
  const [videoList, setVideoList] = useState([]);

  return (
    <div className="gallery-container">
      <h2>Select Your Favorite Animation</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {videoList.map((vid, index) => (
          <div key={index} className="video-card">
            <video src={vid} controls style={{ width: '100%' }} />
            <button onClick={() => alert('Video Selected!')}>Select This Version</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

