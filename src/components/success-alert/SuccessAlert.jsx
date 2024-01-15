import React from "react";
import "./success-alert.css";
import Alert from "react-bootstrap/Alert";
import { FaRegCircleCheck } from "react-icons/fa6";

const SuccessAlert = ({ text, onClose }) => {
  return (
    <div className="success-alert" onClick={() => onClose()}>
      <Alert variant={"success"} style={{display: 'flex', gap: '10px'}} id="alert-message">
        {text}
        <FaRegCircleCheck style={{fontSize: '25px'}}/>
      </Alert>
    </div>
  );
};

export default SuccessAlert;
