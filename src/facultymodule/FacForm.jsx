import React, { useState } from 'react';
import { TextField, Button, Typography, Container, TextareaAutosize, InputAdornment, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import URLS from '../API/Axios/URLS';
import { toast } from 'react-toastify';
import { useSession } from '../redux/Reducers/AuthReducer';

function  FacForm() {
  const [recipients, setRecipients] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [selectedRecipientType, setSelectedRecipientType] = useState('');

  const {SESSION_STORAGE_KEY} = useSession()

  const token = JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)).token; // Replace with actual token
  console.log('token is ', token)
  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };

  
  const handleFormSubmit = async() => {
    
    // You can customize the submission logic here
    console.log('Recipients:', recipients);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('Selected Recipient Type:', selectedRecipientType);
    const postData = {
      submitted_to: 11,
      subject: subject,
      body: body,
      attachments: [1] // You might want to change this based on how you handle file uploads
    };
   try{ 
    const response = await axios.post(URLS.facultyToHr, postData, {headers:headers})
    console.log('response is ', response)
    toast("Form submitted to HR successfully", {type:"success"})
  }
  catch(err){
  console.log(err)
  toast("Error submitting form", {type:"error"})
}
    // You can also send the data to a server using AJAX or any other method
    // Example: sendFormDataToServer(recipients, subject, body);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Student Form
      </Typography>
      <form>
        
      <InputLabel id="recipient-type-label">Recipient Type</InputLabel>
        <Select
          labelId="recipient-type-label"
          id="recipient-type"
          variant="outlined"
          margin="normal"
          value={selectedRecipientType}
          onChange={(e) => setSelectedRecipientType(e.target.value)}
          fullWidth
        >
          <MenuItem value="" style={{ display: 'none' }}>Select Recipient Type</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Coordinator">Coordinator</MenuItem>
        </Select>
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
          placeholder="Body"
          style={{ width: '100%', minHeight: 100, marginTop: 10 }}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input type="file" multiple style={{ marginTop: 10 }} />
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

export default FacForm;
