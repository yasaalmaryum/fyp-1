import React, { useEffect, useState } from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from "@mui/material/Box";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "../redux/Reducers/AuthReducer";
import URLS from "../API/Axios/URLS";
import axios from "axios";
import { toast } from "react-toastify";

export default function Analytics() {
  const { SESSION_STORAGE_KEY } = useSession();

  const [filterStatus, setFilterStatus] = useState("All"); // Default filter is "All"
  const [applications, setApplications] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      // Making both API calls concurrently
      const [facultyApplications] = await Promise.all([
        axios.get(URLS.staffHistory, { headers: headers })
      ]);

      console.log('faculty ', facultyApplications.data.results)
      // Merging both responses
      const mergedApplications = [ ...facultyApplications.data.results];
      setApplications(mergedApplications);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };
  // Replace with your actual data

  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Filter applications based on the selected status
  const filteredApplications =
    filterStatus === "All"
      ? applications
      : applications.filter(
          (application) => application.status === filterStatus
        );

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <FacSidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: "auto" }}>
          <h1>HISTORY</h1>

          {/* Filter Applications */}
          <FormControl sx={{ marginBottom: 2 }}>
            <InputLabel id="filter-label">Filter </InputLabel>
            <Select
              labelId="filter-label"
              id="filter-select"
              value={filterStatus}
              onChange={handleFilterChange}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>

          {/* Table for Applications */}
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {/* Map through your filtered applications and render rows */}
              {filteredApplications.length === 0 && (
                <Box sx={{ p: 2, mt: 2 }}>
                  <p>No applications found</p>
                </Box>
              )}
              {filteredApplications?.map((application) => (
                <TableRow key={application?.id}>
                  <TableCell>{application?.id}</TableCell>
                  <TableCell>
                    {application?.subject}
                  </TableCell>
                  <TableCell>{application?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Application Details */}
          {selectedApplication && (
            <div>
              <h2>Application History</h2>
              <p>{selectedApplication.content}</p>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
}
