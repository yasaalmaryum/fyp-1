// StudentApplicationDetails.js
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const StudentApplicationDetails = ({ application, onClose }) => {
  const [comments, setComments] = useState('');

  useEffect(() => {
    // Fetch additional details of the selected application if needed
    // You can use the application.id to fetch data from the backend
  }, [application]);

  const handleAddComments = () => {
    // Implement logic to add comments and forward the application
    // You can use the application.id and comments to update the backend
    console.log('Adding comments:', comments);
    onClose(); // Close the details modal or navigate back
  };

  return (
    <div>
      <h2>Student Application Details</h2>
      <p>Application Content: {application.content}</p>
      {/* Additional details can be displayed here */}
      <textarea
        placeholder="Add your comments..."
        value={comments}
        onChange={(e) => setComments(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddComments}>
        Add Comments and Forward
      </Button>
    </div>
  );
};

export default StudentApplicationDetails;
