import React, { useState } from 'react';

import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import './TrackScreen.css';

const TrackScreen = ({ onClose }) => {
  const [applicationId, setApplicationId] = useState('');
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    setApplicationId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomStatus = ['approve', 'reject', 'pending'][Math.floor(Math.random() * 3)];
    setStatus(randomStatus);
  };

  return (
    <div className="track-overlay">
      <div className="track-screen">
        <div className="track-content">
          <button onClick={onClose} className="close-button">
            <CloseIcon />
          </button>
          <h2>Track Application</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Application ID"
              value={applicationId}
              onChange={handleInputChange}
            />
            
          </form>
          {status && <p>Status: {status}</p>}
        </div>
      </div>
    </div>
  );
};

export default TrackScreen;
