import React from "react";
import AccountData from "../../account-data/AccountData";
import { Link } from "react-router-dom";
import {
  FiUserPlus,
  FiPlusCircle,
  FiDatabase,
  FiSettings,
  FiArrowLeftCircle,
} from "react-icons/fi";
import axios from "axios";
import logo from "../../../img/Screenshot 2024-06-11 170048.png"

const ManagerLeftMenu = () => {
  const token = localStorage.getItem("auth_token");

  const onExit = async () => {
    try {
      const res = await axios.post("https://service.homely.am/api/auth/logout", {
        token,
      });

      localStorage.removeItem("auth_token");
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="left-menu-panel"
      style={{ width: "300px", position: "relative" }}
    >
      <div className="left-menu">
        <div style={{textAlign: "center"}}>
          <img src={logo} alt="" width={'200px'}/>
          <Link to={"/add"}>
            <div className="menu-item">
              <b>
                Ավելացնել գույք <FiPlusCircle className="menu-icon" />
              </b>
            </div>
          </Link>
          <Link to={"/all_ads"}>
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
          <div className="menu-item" onClick={() => onExit()}>
            <b>
              <FiArrowLeftCircle className="menu-icon" /> Ելք
            </b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerLeftMenu;
