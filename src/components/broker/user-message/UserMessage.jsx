import React from "react";
import "./user-message.css";

const UserMessage = ({ onClose, name, phone, message }) => {
  return (
    <div className="message-panel">
      <div className="message">
        <h2>{name}</h2>
        <p>{phone}</p>
        <hr />
        <p>
            {message}
        </p>
      </div>
      <div
        onClick={() => onClose()}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></div>
    </div>
  );
};

export default UserMessage;
