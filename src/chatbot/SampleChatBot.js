import React, { Component } from 'react';
import ChatBot from 'react-chatbot-kit';
import { BasicStep} from './BasicStep';
import './Chatbot.css';

const steps = BasicStep;

class SampleChatBot extends Component {
  render() {
    return (
      <div>
        <ChatBot steps={steps} />
      </div>
    );
  }
}

export default SampleChatBot;
