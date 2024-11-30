import React, { useState } from "react";
import styled from "styled-components";
import { FaCommentDots } from "react-icons/fa"; // Import chat bubble icon

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Bonjour, comment puis-je vous aider?" },
  ]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (message) => {
    setMessages([...messages, { sender: "user", text: message }]);
    setMessages([...messages, { sender: "bot", text: "Message reçu!" }]);
  };

  return (
    <ChatbotContainer>
      {/* Chat icon with animation */}
      <ChatButton onClick={toggleChat} title="Chat avec nous">
        <FaCommentDots size={30} />
      </ChatButton>

      {/* Chatbox UI */}
      {isOpen && (
        <ChatBox>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                {msg.text}
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Tapez votre message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </ChatBox>
      )}
    </ChatbotContainer>
  );
};

// Styled-components for the chatbot UI
const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

const ChatButton = styled.button`
  background-color: #ffae00;
  color: #000;
  border-radius: 50%;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  
  /* Hover effects */
  &:hover {
    background-color: #5a54d8;
    transform: scale(1.1);
    box-shadow: 0px 8px 18px rgba(0, 0, 0, 0.3);
  }

  /* Pulsating animation */
  animation: pulse 2s infinite;

  /* Tooltip text */
  position: relative;
  &::after {
    content: "Chat avec nous";
    position: absolute;
    bottom: 60px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  /* Show tooltip on hover */
  &:hover::after {
    visibility: visible;
    opacity: 1;
  }

  /* Pulse animation */
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const ChatBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  width: 250px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  .messages {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 10px;
  }

  .user {
    text-align: right;
    color: #333;
  }

  .bot {
    text-align: left;
    color: #666;
  }

  input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
`;

export default Chatbot;


