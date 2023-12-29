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
import Spinner from "../components/Loaders/Spinner/Spinner";

export default function History() {
  const { SESSION_STORAGE_KEY } = useSession();

  const [filterStatus, setFilterStatus] = useState("All"); // Default filter is "All"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      };

      let statusParam = "";
      if (filterStatus === "Approved") {
        statusParam = "APPROVED";
      } else if (filterStatus === "Pending") {
        statusParam = "PENDING";
      } // For 'All', we'll leave statusParam as an empty string

      // try {
      const url = `https://digidocs.hisabkitab.pk/student-api/drop-form-query${
        statusParam ? `?status=${statusParam}` : ""
      }`;
      try {
        setLoading(true);
        const response = await axios.get(url, { headers: headers });
        if (response && response.data) {
          console.log("data is ", response.data.results);
          setApplications(response.data.results || []); // Safely set applications
        } else {
          // Handle cases where response or response.data is undefined
          console.log("No data returned from the API");
          setApplications([]); // Reset applications to empty
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        // Handle the error appropriately (e.g., show an error message)
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);
  // Replace with your actual data

  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  // Filter applications based on the selected status
  const filteredApplications = applications.filter((application) => {
    if (filterStatus === "All") {
      return true; // If 'All' is selected, return all applications
    }
    console.log(
      application.courses_to_drop_data[0].approval_status.toLowerCase() ===
        filterStatus.toLowerCase()
    );
    return (
      application?.courses_to_drop_data?.length > 0 &&
      application.courses_to_drop_data[0].approval_status.toLowerCase() ===
        filterStatus.toLowerCase()
    );
  });
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
                <TableCell>Applicant Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {loading && <Spinner />}
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.id}</TableCell>
                    <TableCell>
                      {application.form?.student_data?.user?.full_name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {application.courses_to_drop_data?.length > 0
                        ? application.courses_to_drop_data[0].approval_status
                        : "No data"}
                    </TableCell>
                  </TableRow>
                ))
              )}
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
