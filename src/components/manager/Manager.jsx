import React from "react";
import AccountData from "../account-data/AccountData";
import ManagerLeftMenu from "./manager-left-menu/ManagerLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Manager = ({ type }) => {
  return (
    <div className="page-data">
      <Router>
        <ManagerLeftMenu type={type} />
        <AccountData type={"Manager"} />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );
};

export default Manager;
