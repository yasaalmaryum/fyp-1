import React from 'react';
import Sidenav from '../pages/Sidenav';
import Navbar from '../pages/Navbar';
import SampleChatBot from "../chatbot/SampleChatBot";
import NewPage from '../chatbot/NewPage';
import { ThemeProvider } from 'styled-components';

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Arial, sans-serif',
  headerBgColor: '#0086b3',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#0086b3',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

function Generate() {
  return (
    <ThemeProvider theme={theme}>
      <Sidenav/>
      <Navbar />
      <div className="centered-container">
        <SampleChatBot />
        <NewPage />
      </div>
    </ThemeProvider>
  );
}

export default Generate;
