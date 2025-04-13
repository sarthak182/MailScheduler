import React, { useState } from "react";
import "./PopupFormCss.css";

function EmailDetailsPopup({ onCancel, onSave }) {
  const [email, setEmail] = useState("");
  const [delay, setDelay] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = () => {
    if (!email || !delay || !message) {
      alert("All fields are required!");
      return;
    }
    onSave({ recipientEmail: email, delay, emailContent: message });
  };

  return (
    <div className="login-container popup-style">
      <h1 className="welcome-container">Email Information</h1>

      <div className="form-container">
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Recipient Email"}
        />
        <input
          type="number"
          placeholder="Delay (in minutes)"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Delay (in minutes)"}
        />
        <textarea
          placeholder="Email Content"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Email Content"}
          style={{ resize: "none" }}
        />
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button className="login-button" onClick={onCancel}>Cancel</button>
          <button className="login-button" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default EmailDetailsPopup;
