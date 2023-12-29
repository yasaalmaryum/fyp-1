import React, { useState } from 'react';

// Define your leave type variables
const leaveTypes = {
  studyLeave: 'Study Leave',
  courseDrop: 'Course Drop',
  semesterFreeze: 'Semester Freeze',
  attendanceIssue: 'Attendance Issue',
};

const BasicStep = [
          {
            id: '1',
            message: 'Hello! I can help you with leave applications. Please select the type of leave application you want to submit:',
            trigger: 'leaveOptions',
          },
          {
            id: 'leaveOptions',
            options: [
              { value: 'studyLeave', label: 'Study Leave', trigger: 'studyLeaveDetails' },
              { value: 'semesterFreeze', label: 'Semester Freeze', trigger: 'semesterFreezeDetails' },
              { value: 'courseDrop', label: 'Course Drop', trigger: 'courseDropDetails' },
              { value: 'attendanceIssue', label: 'Attendance Issue', trigger: 'attendanceIssueDetails' },
            ],
          },
          {
            id: 'studyLeaveDetails',
            message: 'You have selected Study Leave. Please provide the duration (e.g., 1 year, 6 months) for your study leave:',
            trigger: 'studyLeaveDuration',
          },
          {
            id: 'studyLeaveDuration',
            user: true,
            trigger: 'studyLeaveConfirmation',
          },
          {
            id: 'studyLeaveConfirmation',
            message: 'Thank you for providing the duration. You have selected to apply for Study Leave for {previousValue}. Is that correct?',
            trigger: 'studyLeaveConfirmationOptions',
          },
          {
            id: 'studyLeaveConfirmationOptions',
            options: [
              { value: 'yes', label: 'Yes', trigger: 'leaveApplicationEnd' },
              { value: 'no', label: 'No', trigger: 'leaveOptions' },
            ],
          },
          {
            id: 'courseDropDetails',
            message: 'You have selected Course Drop. Please provide more details about the course you want to drop:',
            trigger: 'courseDropConfirmation',
          },
          {
            id: 'courseDropConfirmation',
            user: true,
            trigger: 'courseDropConfirmationOptions',
          },
          {
            id: 'courseDropConfirmationOptions',
            message: 'Thank you for providing the course details. You have selected to apply for Course Drop. Is that correct?',
            trigger: 'leaveApplicationEnd',
          },
          {
            id: 'semesterFreezeDetails',
            message: 'You have selected Semester Freeze. Please provide reasons for freezing the semester:',
            trigger: 'semesterFreezeConfirmation',
          },
          {
            id: 'semesterFreezeConfirmation',
            user: true,
            trigger: 'semesterFreezeConfirmationOptions',
          },
          {
            id: 'semesterFreezeConfirmationOptions',
            message: 'Thank you for providing the reasons. You have selected to apply for Semester Freeze. Is that correct?',
            trigger: 'leaveApplicationEnd',
          },
          {
            id: 'attendanceIssueDetails',
            message: 'You have selected Attendance Issue. Please provide more details about the attendance problems you are facing:',
            trigger: 'attendanceIssueConfirmation',
          },
          {
            id: 'attendanceIssueConfirmation',
            user: true,
            trigger: 'attendanceIssueConfirmationOptions',
          },
          {
            id: 'attendanceIssueConfirmationOptions',
            message: 'Thank you for providing the details. You have selected to apply for Attendance Issue. Is that correct?',
            trigger: 'leaveApplicationEnd',
          },
          {
            id: 'leaveApplicationEnd',
            message: 'Your leave application has been submitted. We will review your request and get back to you soon.',
            end: true,
          },
];

const Designbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');

  const displayMessage = (sender, message) => {
    setChatHistory([...chatHistory, { sender, message }]);
  };

  const processUserInput = () => {
    const userMessage = userInput.trim().toLowerCase();

    // Check if the user's input matches a leave type
    if (leaveTypes.hasOwnProperty(userMessage)) {
      setSelectedLeaveType(userMessage);

      // Construct a customized response message based on the selected leave type
      let responseMessage = `Respected Faculty, I would like to apply for ${leaveTypes[userMessage]}.`;

      // Add specific details based on the leave type
      switch (userMessage) {
        case 'courseDrop':
          responseMessage += ` I want to drop [Course Name] because I am already taking extra subjects and cannot manage all subjects. Kindly consider my request to drop this course.`;
          break;
        case 'studyLeave':
          responseMessage += ` I would like to request ${leaveTypes[userMessage]} for [Number of Years] for my higher-level education.`;
          break;
        case 'semesterFreeze':
          responseMessage += ` I want to freeze the semester due to [Reason]. This prevents me from joining this semester.`;
          break;
        case 'attendanceIssue':
          responseMessage += ` I am facing attendance issues due to [Reason]. Kindly consider my request to resolve this issue.`;
          break;
        default:
          break;
      }

      // Display the customized response message
      displayMessage('User', userInput);
      displayMessage('Bot', responseMessage);
    } else {
      // Handle other user inputs here

      // Display a generic response for unrecognized inputs
      displayMessage('User', userInput);
      displayMessage('Bot', 'Im sorry, but I could not understand your request.');
    }

    setUserInput(''); // Clear the input field
  };

  return (
    <div className="app-container">
      <div className="chatbox">
        {chatHistory.map((item, index) => (
          <div key={index} className={item.sender.toLowerCase()}>
            <strong>{item.sender}:</strong> {item.message}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={processUserInput}>Send</button>
      </div>
    </div>
  );
};

export { BasicStep, Designbot };
