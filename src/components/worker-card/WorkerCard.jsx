import React from "react";
import "./worker-card.css";
import { FiMail, FiPhone } from "react-icons/fi";

const WorkerCard = ({ name, surname, email, id, phone, type }) => {
  return (
    <div className="worker-card">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwk-Uq63t4D1sNv1OBZFe8NqWD9lPqRxnpw&usqp=CAU"
          height={"75px"}
          width={"75px"}
          className="prf-img"
        />
        <div className="prf-data">
          <b>
            {name} {surname}
          </b>
          <p>{type}</p>
        </div>
      </div>
      <div className="prf-contact">
        <div className="contact-data">
          <FiPhone className="prf-icon" />
          <span>{phone}</span>
        </div>
        <div className="contact-data">
          <FiMail className="prf-icon" />
          <span>{email}</span>
        </div>
      </div>
      <button className="delete-acc-btn">Փակել հաշիվը</button>
    </div>
  );
};

export default WorkerCard;
