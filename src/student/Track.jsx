// Import necessary React components and hooks
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon
import "./TrackScreen.css"; // Import TrackScreen.css for styling
import { useSession } from "../redux/Reducers/AuthReducer";
import axios from "axios";
import { toast } from "react-toastify";

// TrackScreen component
const TrackScreen = ({ onClose }) => {
  const [applicationId, setApplicationId] = useState("");
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    setApplicationId(e.target.value);
  };
  const { SESSION_STORAGE_KEY } = useSession();

  const fetchApplications = async () => {
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      const url = `https://digidocs.hisabkitab.pk/student-api/drop-form/${applicationId}`;
      const response = await axios.get(url, { headers: headers });
      console.log("Applications data:", response.data);
      setStatus(response.data.data.courses_to_drop_data[0].approval_status); // Update state with the fetched data
    } catch (error) {
      console.error("Error fetching applications:", error);
      setStatus("Unknown");
      toast(`No form with id ${applicationId}`, {
        type: "error",
      });
      // Handle the error (e.g., show an error message)
    }
  };

  const handleSubmit = (e) => {
    fetchApplications();
    e.preventDefault();
    // const randomStatus = ["approve", "reject", "pending"][
    //   Math.floor(Math.random() * 3)
    // ];
    // setStatus(randomStatus);
  };

  return (
    <div className="track-overlay">
      {" "}
      {/* Apply overlay for background */}
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
const Track = () => {
  const [isTrackScreenVisible, setTrackScreenVisible] = useState(false);

  const toggleTrackScreen = () => {
    setTrackScreenVisible(!isTrackScreenVisible);
  };

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      <Card
        style={{
          width: "100px",
          height: "50px",
          textAlign: "center",
          marginTop: 0,
        }}
      >
        {" "}
        {/* Adjust width and height as needed */}
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

export default Track;
