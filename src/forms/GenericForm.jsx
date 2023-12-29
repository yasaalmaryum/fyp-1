import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  TextareaAutosize,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import URLS from "../API/Axios/URLS";
import axios from "axios";
import { useSession } from "../redux/Reducers/AuthReducer";
import { toast } from "react-toastify";

function Generic() {
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [files, setFiles] = useState([]); // State to manage files

  const { SESSION_STORAGE_KEY } = useSession();

  const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token;
  console.log("token is ", token);

  const handleFileChange = (event) => {
    setFiles(event.target.files); // Update the state with the selected files
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("file", file); // Append each file to form data
    });

    try {
      const response = await axios.post(URLS.uploadFile, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type to multipart
          Authorization: `token ${token}`,
        },
      });
      console.log("response is ", response.data);
      return response.data.map((file) => file.id);
    } catch (error) {
      console.error("Error uploading file:", error);
      return []; // Return an empty array in case of error
    }
  };

  const handleFormSubmit = async () => {
    // const fileIds = await uploadFiles(); // Upload files and get their IDs
    const formPayload = {
      form: {
        submitted_to: 11, //HR
        subject: subject,
        body: body,
        attachments: [1], // Attach the file IDs
      },
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: `token ${token}`,
    };

    try {
      await axios
        .post(URLS.genericForm, formPayload, { headers: headers })
        .then((data) => console.log("response is ", data));
      console.log("Form submitted successfully");
      toast("Form submitted to HR", {
        type: "success",
      });
      // Handle successful submission (e.g., clear the form, show a success message)
    } catch (error) {
      console.error("Error submitting form:", error);
      toast("Form submission error", {
        type: "error",
      });
      // Handle errors (e.g., show an error message)
    }
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Student Form
      </Typography>
      <form>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          variant="outlined"
          margin="normal"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          fullWidth
        >
          <MenuItem value="" style={{ display: "none" }}>
            Transparent
          </MenuItem>
          <MenuItem value="Class Counselor">Class Counselor</MenuItem>
          <MenuItem value="Coordinator">Coordinator</MenuItem>
          {/* Add more options as needed */}
        </Select>

        <TextField
          fullWidth
          id="recipients"
          label="To"
          variant="outlined"
          margin="normal"
          value={recipients}
          onChange={(e) => setRecipients(e.target.value)}
          required
        />
        <TextField
          fullWidth
          id="subject"
          label="Subject"
          variant="outlined"
          margin="normal"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <TextareaAutosize
          id="body"
          placeholder="Body (minimum 10 characters)"
          style={{ width: "100%", minHeight: 100, marginTop: 10 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          minLength={10}
        />
        <input
          type="file"
          multiple
          style={{ marginTop: 10 }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFormSubmit}
          style={{ marginTop: 10 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Generic;
