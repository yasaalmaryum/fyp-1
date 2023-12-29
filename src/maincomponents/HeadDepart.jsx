import React, { useState, useEffect } from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function HeadPanel() {
  // Replace with your actual data
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  useEffect(() => {
    // Simulating a fetch request to a backend API
    // Replace this with your actual fetch logic
    const fetchData = async () => {
      try {
        // Replace the URL with your actual backend endpoint
        const response = await fetch('https://your-backend-api.com/applications');
        const data = await response.json();

        // Assuming the data structure has 'id', 'submitted_by', 'status', 'subject', 'body' fields
        setApplications(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  const handleAccept = () => {
    // Logic for accepting the application
    // For example, update the status to 'APPROVED'
    if (selectedApplication) {
      // Implement your update logic here, e.g., send a request to the backend
      console.log('Accepting application:', selectedApplication);
      setSelectedApplication(null);
    }
  };

  const handleReject = () => {
    // Logic for rejecting the application
    // For example, update the status to 'REJECTED'
    if (selectedApplication) {
      // Implement your update logic here, e.g., send a request to the backend
      console.log('Rejecting application:', selectedApplication);
      setSelectedApplication(null);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        <FacSidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: 'auto' }}>
          <h1>HOD PANEL</h1>

          {/* Table for Applications */}
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {/* Map through your applications and render rows */}
              {applications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{`Applicant ${application.submitted_by}`}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={() => handleApplicationClick(application)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Application Details and Actions */}
          {selectedApplication && (
            <div>
              <h2>Faculty Application Details</h2>
              <p>{selectedApplication.body}</p>
              <Button variant="contained" color="success" onClick={handleAccept} sx={{ mr: 2 }}>
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={handleReject} sx={{ mr: 2 }}>
                Reject
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
