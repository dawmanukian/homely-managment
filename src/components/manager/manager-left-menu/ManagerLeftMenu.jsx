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

const ManagerLeftMenu = () => {
  return (
    <div className="left-menu">
      <div>
        <AccountData type={'Manager'}/>
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
        <div className="menu-item">
          <b>
            Կարգավորումններ <FiSettings className="menu-icon" />
          </b>
        </div>
        <div className="menu-item">
          <b>
            <FiArrowLeftCircle className="menu-icon" /> Ելք
          </b>
        </div>
      </div>
    </div>
  );
};

export default ManagerLeftMenu;
