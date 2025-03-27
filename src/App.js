import React, { useState } from 'react';
import { FaRobot, FaTimes } from 'react-icons/fa';
import HealthcareChat from './HealthcareChat';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Healthcare AI Portal</h1>
        <p>Your intelligent health assistant</p>
      </header>

      <main className="app-main">
        <div className="app-content">
          <h2>Welcome to Healthcare AI</h2>
          <p>Get instant answers to your medical questions from our AI assistant.</p>
          <div className="features">
            <div className="feature-card">
              <h3>24/7 Assistance</h3>
              <p>Always available when you need medical information</p>
            </div>
            <div className="feature-card">
              <h3>Trusted Sources</h3>
              <p>Answers based on verified medical knowledge</p>
            </div>
            <div className="feature-card">
              <h3>Quick Responses</h3>
              <p>Get instant answers to your health queries</p>
            </div>
          </div>
        </div>

        {/* Floating AI Assistant Button */}
        <div 
          className={`ai-assistant-button ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
        </div>

        {/* Chat Modal */}
        {isChatOpen && (
          <div className="chat-modal">
            <HealthcareChat />
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Healthcare AI. For informational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;