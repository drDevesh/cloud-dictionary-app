import React, { useState } from "react";
import axios from "axios";

function App() {
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://7iv56lhkcg.execute-api.us-east-1.amazonaws.com/prod/get-definition?term=${encodeURIComponent(term)}`
      );
      setDefinition(res.data.definition || "Definition not found.");
    } catch (err) {
      console.error(err);
      setDefinition("Definition not found or error occurred.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "5rem",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#fff", marginBottom: "2rem" }}>🌩️ Cloud Dictionary</h1>

      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center"
      }}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Enter a cloud term..."
          style={{
            padding: "0.7rem 1rem",
            width: "70%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            fontSize: "16px",
            marginRight: "1rem"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.7rem 1.2rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Search
        </button>

        {definition && (
          <div style={{
            marginTop: "2rem",
            backgroundColor: "#f4f4f4",
            padding: "1rem 1.5rem",
            borderRadius: "10px",
            textAlign: "left",
            color: "#333",
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ margin: 0, marginBottom: "0.5rem", color: "#444" }}>{term}</h3>
            <p style={{ margin: 0 }}>{definition}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
