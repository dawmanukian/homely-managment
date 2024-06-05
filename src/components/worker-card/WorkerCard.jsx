import React, { useState } from "react";
import "./worker-card.css";
import { FiMail, FiPhone } from "react-icons/fi";
import axios from "axios";

const WorkerCard = ({
  name,
  surname,
  email,
  id,
  phone,
  type,
  image,
  hidde_deleted,
}) => {
  const [showLoading, setShowLoading] = useState(false);
  const delete_user = async (params) => {
    try {
      setShowLoading(true);
      const res = await axios.post(
        `https://service.homely.am/api/admin/delete/user`,
        { user_id: id }
      );
      res.data.success && hidde_deleted(id);
    } catch (error) {
      console.log(error);
    } finally {
      setShowLoading(false);
    }
  };

  return (
    <div className="worker-card">
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img src={image} height={"75px"} width={"75px"} className="prf-img" />
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
      <button
        style={showLoading ? { opacity: "60%" } : null}
        className="delete-acc-btn"
        onClick={() => delete_user()}
      >
        Փակել հաշիվը
      </button>
    </div>
  );
};

export default WorkerCard;
