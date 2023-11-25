import React from "react";
import "./broker-card.css";

const BrokerCard = ({ name, surname, selected, onSelect, phone }) => {
  return (
    <div className="broker-card">
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCwk-Uq63t4D1sNv1OBZFe8NqWD9lPqRxnpw&usqp=CAU"
        height={"70px"}
        width={"70px"}
        className="broker-img"
      />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'gray'
      }}>
        <span>{name} {surname}</span>
        <span>{phone}</span>
      </div>
      <button
        className={`select-btn ${selected && "selected"}`}
        onClick={() => onSelect()}
      >
        {selected ? "Ընտրված է" : "Ընտրել"}
      </button>
    </div>
  );
};

export default BrokerCard;
