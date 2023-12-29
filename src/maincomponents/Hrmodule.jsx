// HrPanel.js
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
import { useSession } from "../redux/Reducers/AuthReducer";
import axios from "axios";
import URLS from "../API/Axios/URLS";
import { toast } from "react-toastify";

const HrPanel = () => {
  const { SESSION_STORAGE_KEY } = useSession();
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
      const [studentApplications, facultyApplications] = await Promise.all([
        axios.get(URLS.listApplications, { headers: headers }),
        axios.get(URLS.facultyToHrRequests, { headers: headers })
      ]);

      // Merging both responses
      const mergedApplications = [...studentApplications.data.results, ...facultyApplications.data.results];
      setApplications(mergedApplications);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  const handleFilterChange = (event) => {
    const status = event.target.value;
    setFilterValue(status);

    // No need to filter here, as the table will handle the filtering dynamically
  };

  const handleApproval = async (applicationId, isApprove) => {
    const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      const status = isApprove ? 'APPROVED' : 'REJECTED';
      await axios.post(`https://digidocs.hisabkitab.pk/digi-admin/staff-generic-form-approve-reject/${applicationId}`, { status }, { headers: headers });
      toast.success(`Application ${isApprove ? 'approved' : 'rejected'} successfully`);
      fetchData(); // Refresh the list after the action
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update the application status");
    }
  };

  const filteredApplications = applications.filter((app) => filterValue === "" || app.status === filterValue);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <FacSidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: "auto" }}>
          <h1>HR PANEL</h1>
          <label>
            Filter by Status:
            <select value={filterValue} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="PENDING">Pending</option>
            </select>
          </label>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Application ID</TableCell>
                <TableCell>Applicant Name</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.id}</TableCell>
                  <TableCell>{application?.form?.student_data?.user?.full_name || "Staff"}</TableCell>
                  <TableCell>{application?.form?.subject || application?.subject}</TableCell>
                  <TableCell color="green" style={{backgroundColor:application?.body?'#D1FFBD':'#ADD8E6'}}>{application?.body ? "Staff application":"Student application"}</TableCell>
                  <TableCell>{application?.form?.status || application?.status}</TableCell>
                  <TableCell>
                    <Button
                      disabled={application.status !== 'PENDING'}
                      onClick={() => handleApproval(application.id, true)}
                      variant="outlined"
                    >
                      Approve
                    </Button>
                    <Button
                      disabled={application.status !== 'PENDING'}
                      onClick={() => handleApproval(application.id, false)}
                      variant="outlined"
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
};

export default HrPanel;
