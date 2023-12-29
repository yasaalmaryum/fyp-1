// FacPanel.js
import { useState, useEffect } from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSession } from "../redux/Reducers/AuthReducer";
import axios from "axios";
import URLS from "../API/Axios/URLS";
import { toast } from "react-toastify";

const FacPanel = () => {
  const { SESSION_STORAGE_KEY } = useSession();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
  const staffProfile = JSON.parse(
    localStorage.getItem(SESSION_STORAGE_KEY)
  ).staffProfile;
  const isHR = staffProfile.role === "HR";

  useEffect(() => {
    // Fetch all applications initially
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
    const staffProfile = JSON.parse(
      localStorage.getItem(SESSION_STORAGE_KEY)
    ).staffProfile;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    console.log(staffProfile.role);

    let apiUrl = URLS.listApplications; // Default API endpoint
    if (staffProfile && staffProfile.role === "HR") {
      apiUrl = URLS.listGenericForms; // Change API endpoint if the role is HR
    }

    try {
      const response = await axios.get(apiUrl, { headers: headers });
      setApplications(response.data.results);
      console.log("forms data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast("Error fetching data", { type: "error" });
    }
  };

  const handleFilterChange = (event) => {
    // const status = event.target.value;
    setFilterValue(status); // Update the filter value based on selection

    if (status) {
      // Filter applications based on the selected status
      const filteredApps = applications.filter(
        (app) => app.courses_to_drop_data[0].approval_status === status
      );
      setFilteredApplications(filteredApps);
    } else {
      // If no status is selected (or a 'reset' option), show all applications
      setFilteredApplications(applications);
    }
  };
  console.log(status);

  const handleViewDetails = async (application, stat) => {
    setStatus(stat);
    console.log(application);
    const id = isHR
      ? application.form.id
      : application?.courses_to_drop_data[0].id;
    const body = {
      courseId: id,
      status: stat,
    };
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
    // const token = "a8230dc2e89478f922099ee1c1839a5caf9bec5f";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      const response = await axios.post(URLS.approveApplication, body, {
        headers: headers,
      });
      console.log("response data:", response);
      toast("Request Verification Successful", { type: "success" });
      // setApplications(response.data.results);
    } catch (error) {
      console.error("Error fetching form:", error);
      toast("Request Verification failed", { type: "error" });
    }
    fetchData();
    // Navigate to the details screen
    // navigate(`/application-details/${applicationId}`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <FacSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: "auto" }}>
          <h1>FACULTY PANEL</h1>
          {/* Filter Applications Component */}
          <label>
            Filter by Status:
            <select value={filterValue} onChange={handleFilterChange}>
              <option value="">All</option> {/* Option to clear the filter */}
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PENDING">Pending</option>
              {/* Add more options as needed */}
            </select>
          </label>
          {/* Table for Applications */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(filterValue ? filteredApplications : applications).map(
                (application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      {isHR
                        ? application.id
                        : application.courses_to_drop_data[0].id}
                    </TableCell>
                    <TableCell>
                      {application.form.student_data.user.full_name}
                    </TableCell>
                    <TableCell>
                      {/* {application.courses_to_drop_data[0].approval_status} */}
                    </TableCell>
                    <TableCell>
                      <Button
                        disabled={
                          isHR
                            ? application.form.status
                            : application.courses_to_drop_data[0].approval_status.toLowerCase() !==
                              "pending"
                        }
                        sx={{ marginX: "10px" }}
                        variant="outlined"
                        onClick={() =>
                          handleViewDetails(application, "APPROVED")
                        }
                      >
                        Approve Request
                      </Button>

                      <Button
                        disabled={
                          isHR
                            ? application.form.status
                            : application.courses_to_drop_data[0].approval_status.toLowerCase() !==
                              "pending"
                        }
                        variant="outlined"
                        onClick={() =>
                          handleViewDetails(application, "REJECTED")
                        }
                      >
                        Reject Request
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default FacPanel;
