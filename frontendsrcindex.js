(frontend/src/index.js)

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/App.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
JS




/code (frontend/src/App.js)

import React from 'react';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="App">
      <h1>Interactive AI Tutor</h1>
      <ChatInterface />
    </div>
  );
}

export default App;
JS




/code (frontend/src/components/ChatInterface.js)

import React, { useState } from 'react';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);

      const response = await fetch('/api/interact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      const aiMessage = { sender: 'ai', text: data.response };
      setMessages([...messages, userMessage, aiMessage]);
      setInput('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default ChatInterface;
JS




/code (frontend/src/styles/App.css)

body {
  font-family: Arial, sans-serif;
}

.App {
  text-align: center;
  padding: 20px;
}

.chat-interface {
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}

.message.user {
  background-color: #d1e7dd;
  text-align: left;
}

.message.ai {
  background-color: #f8d7da;
  text-align: right;
}

input[type="text"] {
  width: calc(100% - 60px);
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}