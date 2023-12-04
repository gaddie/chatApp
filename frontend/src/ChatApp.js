import React, { useState, useEffect } from 'react';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = async () => {
    // Send message to the backend
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: newMessage }),
    });

    const result = await response.json();
    console.log(result);

    // Clear the message input
    setNewMessage('');
  };

  useEffect(() => {
    // Fetch and display messages from the backend
    const fetchMessages = async () => {
      const response = await fetch('/api/messages');
      const result = await response.json();
      setMessages(result);
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat-container">
    <div>
        <h2>ChatApp</h2>
    </div>
      <div className="input-area">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="send-button">Send</button>
      </div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className="message">
            <span className="sender-tag">{msg.sender}: </span>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatApp;
