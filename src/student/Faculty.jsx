import React, { useEffect, useState } from "react";
import FacSidenav from "../pages/FacSidenav";
import Navbar from "../pages/Navbar";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { useSession } from "../redux/Reducers/AuthReducer";
import URLS from "../API/Axios/URLS";
import axios from "axios";

export default function Faculty() {
  // const initialFacultyData = [
  //   {
  //     id: 1,
  //     facultyName: "Faculty 1",
  //     department: "Department 1",
  //     designation: "Designation 1",
  //     gmail: "faculty1@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 2",
  //     department: "Department 2",
  //     designation: "Designation 2",
  //     gmail: "faculty2@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 3",
  //     department: "Department 3",
  //     designation: "Designation 3",
  //     gmail: "faculty3@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 4",
  //     department: "Department 4",
  //     designation: "Designation 4",
  //     gmail: "faculty4@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 5",
  //     department: "Department 5",
  //     designation: "Designation 5",
  //     gmail: "faculty5@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 6",
  //     department: "Department 6",
  //     designation: "Designation 6",
  //     gmail: "faculty6@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 7",
  //     department: "Department 7",
  //     designation: "Designation 7",
  //     gmail: "faculty7@gmail.com",
  //   },
  //   {
  //     id: 2,
  //     facultyName: "Faculty 8",
  //     department: "Department 8",
  //     designation: "Designation 8",
  //     gmail: "faculty8@gmail.com",
  //   },
  // ];

  const [facultyData, setFacultyData] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const { SESSION_STORAGE_KEY } = useSession();

  useEffect(() => {
    const fetchFacultyData = async () => {
      const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `token ${token}`, // Adjust if your token format is different
      };

      try {
        const response = await axios.get(URLS.listTeachers, { headers });
        console.log("Faculty data:", response.data.results); // Log the fetched faculty data
        setFacultyData(response.data.results || []); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching faculty data:", error);
        // Handle the error appropriately (e.g., show an error message)
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <FacSidenav />

        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: 250, m: "auto" }}>
          <h1>FACULTY DETAILS</h1>

          {/* Table for Faculty Data */}
          <Table>
            {/* Table Head */}
            <TableHead>
              <TableRow>
                <TableCell>Faculty ID</TableCell>
                <TableCell>Faculty Name</TableCell>
                <TableCell>Faculty Department</TableCell>
                <TableCell>Faculty Designation</TableCell>
                <TableCell>Faculty Gmail</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {/* Map through your faculty data and render rows */}
              {facultyData.length == 0 && <p>No records found</p>}
              {facultyData?.map((faculty) => (
                <TableRow key={faculty.id}>
                  <TableCell>{faculty.id}</TableCell>
                  <TableCell>{faculty.user.full_name}</TableCell>
                  <TableCell>{faculty.department_data.name}</TableCell>
                  <TableCell>
                    {faculty.role === "STAFF" ? "Faculty" : faculty.role}
                  </TableCell>
                  <TableCell>{faculty.user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </>
  );
}
