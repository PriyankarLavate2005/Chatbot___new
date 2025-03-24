import React, { useState } from "react";
import axios from "axios";

import "./HealthcareChat.css"; // Import CSS file for styling

const App = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = ""; // Replace with your Gemini API Key
  const URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(URL, {
        contents: [{ parts: [{ text: query }] }],
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
    <div className="container">
      <h2>Healthcare AI Assistant 🏥</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Ask any healthcare-related question..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></textarea>

        <button type="submit" disabled={loading}>
          {loading ? "Fetching..." : "Ask AI"}
        </button>
      </form>

      {response && (
        <div className="response-box">
          <strong>AI Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default App;
