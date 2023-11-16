import React from "react";
import AccountData from "../../account-data/AccountData";
import { Link } from "react-router-dom";
import {
  FiFileText,
  FiPlusCircle,
  FiDatabase,
  FiSettings,
  FiArrowLeftCircle,
} from "react-icons/fi";

const BrokerLeftMenu = () => {
  return (
    <div className="left-menu">
      <div>
        <AccountData type={"Broker"} />
        <Link to={"/add"}>
          <div className="menu-item">
            <b>
              Ավելացնել գույք <FiPlusCircle className="menu-icon" />
            </b>
          </div>
        </Link>
        <Link to={"/requests"}>
          <div className="menu-item">
            <b>
              Հայտեր <FiFileText className="menu-icon" />
            </b>
          </div>
        </Link>
        <Link to={"/my_ads"}>
          <div className="menu-item">
            <b>
              Իմ հայտարարությունները <FiDatabase className="menu-icon" />
            </b>
          </div>
        </Link>
        <Link to={"/my_ads"}>
          <div className="menu-item">
            <b>
              Հայտարարություններ <FiDatabase className="menu-icon" />
            </b>
          </div>
        </Link>
      </div>
      <div>
        <Link to={"/settings"}>
          <div className="menu-item">
            <b>
              Կարգավորումններ <FiSettings className="menu-icon" />
            </b>
          </div>
        </Link>
        <div
          className="menu-item"
          onClick={() => {
            
            window.location = "http://localhost:3001";
          }}
        >
          <b>
            <FiArrowLeftCircle className="menu-icon" /> Ելք
          </b>
        </div>
      </div>
    </div>
  );
};

export default BrokerLeftMenu;
