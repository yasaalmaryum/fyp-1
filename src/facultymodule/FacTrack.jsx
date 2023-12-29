// Import necessary React components and hooks
import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import '../student/TrackScreen.css'; // Import TrackScreen.css for styling

// TrackScreen component
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
    <div className="track-overlay"> {/* Apply overlay for background */}
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

// Main component
const FacTrack = () => {
  const [isTrackScreenVisible, setTrackScreenVisible] = useState(false);

  const toggleTrackScreen = () => {
    setTrackScreenVisible(!isTrackScreenVisible);
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Card style={{ width: '100px', height: '50px', textAlign:'center', marginTop: 0 }}> {/* Adjust width and height as needed */}
        
        <CardContent>
          <Button onClick={toggleTrackScreen}>
           <b>Track</b>
          </Button>
        </CardContent>
      </Card>

      {isTrackScreenVisible && <TrackScreen onClose={toggleTrackScreen} />}
    </div>
  );
};

export default FacTrack;
