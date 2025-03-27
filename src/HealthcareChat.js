import React, { useState } from "react";
import axios from "axios";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import "./HealthcareChat.css";

const HealthcareChat = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "";
  const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(URL, {
        contents: [{ parts: [{ text: `You are a medical assistant. Provide accurate, concise health information. Answer this: ${query}` }] }],
      });

      const answer = res.data.candidates[0].content.parts[0].text;
      setResponse(answer);
    } catch (error) {
      console.error("API Error:", error);
      setResponse("⚠️ Sorry, something went wrong. Please try again!");
    }

    setLoading(false);
  };

  return (
    <div className="healthcare-chat-container">
      <div className="chat-header">
        <h2>Healthcare AI Assistant</h2>
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Online</span>
        </div>
      </div>

      <div className="chat-messages">
        {response && (
          <div className="message ai-message">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <p>{response}</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <textarea
            placeholder="Ask any healthcare-related question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading || !query.trim()}>
            {loading ? <FaSpinner className="spinner" /> : <FaPaperPlane />}
          </button>
        </div>
        <small className="disclaimer">
          Note: This AI provides general information only, not medical advice.
        </small>
      </form>
    </div>
  );
};

export default HealthcareChat;