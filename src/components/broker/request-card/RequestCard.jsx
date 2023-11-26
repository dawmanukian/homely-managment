import React from "react";
import "./request-card.css";
import { FaTrashCan } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import UserMessage from "../user-message/UserMessage";

const RequestCard = ({ onShowMessage, name, phone }) => {
  return (
    <div className="request-card">
      <b className="user-name">
        <FaUserLarge /> {name}
      </b>
      <p className="user-phone">
        <FaPhone /> {phone}
      </p>
      <div className="req-btns">
        <button className="view-btn-item">
          <FaRegEye /> Տեսնել հայտարարությունը
        </button>
        <button
          className="view-btn-message"
          onClick={() => onShowMessage()}
        >
          <FaMessage /> Տեսնել հաղորդագրությունը
        </button>
        <button className="del-btn">
          <FaTrashCan /> Ջնջել
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
