import { Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import FacSidenav from "../pages/FacSidenav";
import Navbar from '../pages/Navbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function FacCreate() {
  const [value, setvalue] = useState('');

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
   
    <Card style={{ marginLeft: '25px',marginTop: '25px', padding: '30px' }}>
      <Navbar/>
       <FacSidenav/>
      <CardContent>
        <ReactQuill modules={modules} theme='snow' value={value} onChange={setvalue} />
      </CardContent>
    </Card>
  );
}

export default FacCreate;

