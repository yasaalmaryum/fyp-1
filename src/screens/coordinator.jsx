import React, { useState } from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function HrPanel() {
  // Replace with your actual data
  const initialApplications = [
    { id: 1, applicantName: 'Applicant 1', status: 'Pending', content: 'Attendance Issue 1' },
    { id: 2, applicantName: 'Applicant 2', status: 'Pending', content: 'Subject Improvement 2' },
    { id: 3, applicantName: 'Applicant 3', status: 'Pending', content: 'Semeter Freeze 3' },
    { id: 4, applicantName: 'Applicant 4', status: 'Pending', content: 'Course Drop 4' },
    { id: 5, applicantName: 'Applicant 5', status: 'Pending', content: 'Course Drop 5' },
    { id: 6, applicantName: 'Applicant 6', status: 'Pending', content: 'Attendance Issue 6' },
    { id: 7, applicantName: 'Applicant 7', status: 'Pending', content: 'Attendance Issue 7' },
    { id: 8, applicantName: 'Applicant 8', status: 'Pending', content: 'Attendance Issue 8' },
    { id: 9, applicantName: 'Applicant 9', status: 'Pending', content: 'Course Drop 9' },
  
    // Add more applications as needed
  ];

  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  const handleAccept = () => {
    // Logic for accepting the application
    // For example, update the status to 'Approved'
    if (selectedApplication) {
      const updatedApplications = applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: 'Approved' } : app
      );
      setApplications(updatedApplications);
      setSelectedApplication(null);
    }
  };

  const handleReject = () => {
    // Logic for rejecting the application
    // For example, update the status to 'Rejected'
    if (selectedApplication) {
      const updatedApplications = applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: 'Rejected' } : app
      );
      setApplications(updatedApplications);
      setSelectedApplication(null);
    }
  };

  const handleDecideLater = () => {
    // Logic for deciding later on the application
    // For example, update the status to 'Decide Later'
    if (selectedApplication) {
      const updatedApplications = applications.map((app) =>
        app.id === selectedApplication.id ? { ...app, status: 'Decide Later' } : app
      );
      setApplications(updatedApplications);
      setSelectedApplication(null);
    }
  };

  return (
    <>
     <Navbar />
      <Box sx={{ display: 'flex' }}>
        <FacSidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: 'auto' }}>
          <h1>FACULTY PANEL</h1>

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
                  <TableCell>{application.applicantName}</TableCell>
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
              <p>{selectedApplication.content}</p>
              <Button variant="contained" color="success" onClick={handleAccept} sx={{ mr: 2 }}>
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={handleReject} sx={{ mr: 2 }}>
                Reject
              </Button>
              <Button variant="outlined" onClick={handleDecideLater}>
                Decide Later
              </Button>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
