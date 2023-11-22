import React from "react";
import "./account-data.css";
import MobileLeftMenu from "../mobile-left-menu/MobileLeftMenu";

const AccountData = ({ type }) => {
  return (
    <div className="account-data">
      <img
        src="https://www.catbreedslist.com/cat-wallpapers/white-kitten-cute-big-eyes-art-1024x768.jpg"
        className="account-img"
      />
      <div className="account-name">
        <span>Դավիթ Մանուկյան</span>
        <b>{type}</b>
      </div>
      <MobileLeftMenu type={type}/>
    </div>
  );
};

export default AccountData;
