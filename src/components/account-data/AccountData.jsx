import React from "react";
import "./account-data.css";
import MobileLeftMenu from "../mobile-left-menu/MobileLeftMenu";

const AccountData = ({ userData }) => {
  return (
    <div className="account-data">
      <img
        src={userData.image}
        className="account-img"
      />
      <div className="account-name">
        <span>{userData.name} {userData.surname}</span>
        <b>{userData.type}</b>
      </div>
      <MobileLeftMenu type={userData.type}/>
    </div>
  );
};

export default AccountData;
