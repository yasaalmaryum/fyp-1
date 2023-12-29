import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Calendar from "react-calendar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import URLS from "../API/Axios/URLS";
import axiosInstance from "../API/Axios/AxiosConfig";
import { toast } from "react-toastify";
import { is_success } from "../API/Axios/Status";
import axios from "axios";
import { useSession } from "../redux/Reducers/AuthReducer";

export default function SubjectImprove() {
  const { SESSION_STORAGE_KEY } = useSession();

  const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Course Drop");
  const [tableData, setTableData] = useState([
    {
      courseTitle: "",
      courseNumber: "",
      credits: "",
      concernedTeacherName: "",
    },
  ]);
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [calendarDate, setCalendarDate] = useState(null);
  const [calendarText, setCalendarText] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Declare and initialize isCalendarOpen

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Construct the courses_to_drop array based on tableData
    const coursesToDrop = tableData.map((course) => ({
      course_number: parseInt(course.courseNumber), // Ensure this is an integer
      course_title: course.courseTitle,
      credit_hours: parseInt(course.credits), // Ensure this is an integer
      teacher: 3,
    }));

    // Construct the API request body according to the specified format
    const apiRequestBody = {
      form: {
        submitted_to: 3, // Assuming this is a constant; modify as needed
        subject: "Subject of the Form", // Modify this as needed
        body: "Hello this is a form", // Modify this as needed
        attachments: [1], // Assuming this is a constant; modify as needed
      },
      hod: 3, // Assuming this is a constant; modify as needed
      courses_to_drop: coursesToDrop,
    };

    console.log("header here ", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    // Send the request
    axios
      .post(URLS.DropForm, apiRequestBody, { headers: headers })
      .then((res) => {
        toast("Application Submitted Successful", {
          type: "success",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast("Course Drop Error", {
          type: "error",
        });
      });
  };

  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleAddRow = () => {
    if (tableData.length === 1) {
      // If it's the first row, remove it before adding a new one
      setTableData([
        {
          courseTitle: "",
          courseNumber: "",
          credits: "",
          concernedTeacherName: "",
        },
      ]);
    }
    setTableData((prevData) => [
      ...prevData,
      {
        courseTitle: "",
        courseNumber: "",
        credits: "",
        concernedTeacherName: "",
      },
    ]);
  };

  const handleRemoveRow = (index) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const handleFieldChange = (index, field, value) => {
    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };

  const handleDateChange = (date) => {
    setCalendarDate(date);
  };

  const handleCalendarInputChange = (event) => {
    setCalendarText(event.target.value);
  };

  const handleCalendarTextSubmit = () => {
    const parsedDate = new Date(calendarText);
    if (!isNaN(parsedDate.getTime())) {
      // Check if the parsed date is valid
      setCalendarDate(parsedDate);
    } else {
      // Handle invalid date input (e.g., show an error message)
      console.error("Invalid date input");
    }
  };

  const handleCalendarIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen); // Toggle the calendar visibility
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "70px",
        marginLeft: "50px",
      }}
    >
      <Card>
        <CardContent>
          <center>
            <h5>{selectedType} Form</h5>
          </center>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <TextField
              label="Full Name"
              id="outlined-start-adornment"
              variant="outlined"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Registration Number"
              id="outlined-start-adornment"
              variant="outlined"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
            />

            <TextField
              label="Designation"
              id="outlined-start-adornment"
              variant="outlined"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />

            <TextField
              label="Department"
              id="outlined-start-adornment"
              variant="outlined"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
          </Box>

          {/* Filter TextField with Dropdown Menu */}
          <Select
            label="Select Application Type"
            id="outlined-select-type"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            variant="outlined"
            sx={{ mt: 2, width: "100%" }}
          >
            {[
              "Course Drop",
              "Semester Freeze",
              "Subject Improvement",
              "Attendance Issue",
            ].map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Course Title</TableCell>
                  <TableCell>Course Number</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Concerned Teacher Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((rowData, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        label="Course Title"
                        variant="outlined"
                        fullWidth
                        value={rowData.courseTitle}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "courseTitle",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Course Number"
                        variant="outlined"
                        fullWidth
                        value={rowData.courseNumber}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "courseNumber",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Credits"
                        variant="outlined"
                        fullWidth
                        value={rowData.credits}
                        onChange={(e) =>
                          handleFieldChange(index, "credits", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        label="Concerned Teacher Name"
                        variant="outlined"
                        fullWidth
                        value={rowData.concernedTeacherName}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "concernedTeacherName",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {tableData.length > 1 && (
                        <IconButton
                          aria-label="remove"
                          color="secondary"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAddRow}
          >
            Add Row
          </Button>

          {/* Calendar Date Picker */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Calendar Date"
              variant="outlined"
              sx={{ mt: 2, width: "100%" }}
              value={calendarDate}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            label="Select Date (YYYY-MM-DD)"
            variant="outlined"
            sx={{ mt: 2, width: "100%" }}
            value={calendarText}
            onChange={handleCalendarInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCalendarTextSubmit}>
                    <CalendarMonthIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={handleCalendarIconClick}>
            <CalendarMonthIcon />
          </IconButton>

          {isCalendarOpen && ( // Render the calendar when isCalendarOpen is true
            <Calendar
              onChange={handleDateChange}
              value={calendarDate}
              onClickDay={() => setIsCalendarOpen(false)}
            />
          )}

          {/* Scroll Button */}
          <IconButton
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
              borderRadius: "50%",
              backgroundColor: "#2196f3",
              color: "white",
            }}
            onClick={handleScrollToBottom}
          >
            <ArrowDownwardIcon />
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
          >
            <Paper elevation={3} sx={{ p: 2, background: "#f5f5f5" }}>
              <Typography variant="body2" sx={{ textAlign: "center" }}>
                <Typography sx={{ color: "blue" }}>Proceeding! </Typography>
                Send Form to the Class Counselor
              </Typography>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleNotificationClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Paper>
          </Snackbar>
        </CardContent>
      </Card>
    </Box>
  );
}
