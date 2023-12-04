import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Agent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the server
    axios.get('http://127.0.0.1:5000')
      .then((response) => setMessages(response.data))
      .catch((error) => console.error('Error fetching messages:', error));
  }, []);


  const groupMessagesByUserId = () => {
    const groupedMessages = {};
    messages.forEach((message) => {
      const userId = message.UserID;
      if (!groupedMessages[userId]) {
        groupedMessages[userId] = [];
      }
      groupedMessages[userId].push(message);
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByUserId();

  return (
    <div className="App">
      <h1>Message App</h1>
      <div>
        {Object.keys(groupedMessages).map((userId) => (
          <div key={userId}>
            <h2>UserID: {userId}</h2>
            <ul>
              {groupedMessages[userId].map((message) => (
                <li key={message.id}>{message.Message}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agent;
