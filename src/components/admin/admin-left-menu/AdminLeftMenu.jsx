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

const AdminLeftMenu = () => {
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
        <div>
          <Link to={"/"}>
            <div className="menu-item">
              <b>
                Ավելացնել օգտանուն <FiUserPlus className="menu-icon" />
              </b>
            </div>
          </Link>
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
          <Link to={"/managers"}>
            <div className="menu-item">
              <b>Մենեջերներ</b>
            </div>
          </Link>
          <Link to={"/brokers"}>
            <div className="menu-item">
              <b>Գործակալներ</b>
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

export default AdminLeftMenu;
