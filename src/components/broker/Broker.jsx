import React from "react";
import BrokerLeftMenu from "./broker-left-menu/BrokerLeftMenu";
import AccountData from "../account-data/AccountData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "../add-user/AddUser";

const Broker = ({ type }) => {
  return (
    <div className="page-data">
      <Router>
        <BrokerLeftMenu type={type} />
        <AccountData type={"Broker"} />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );  
};

export default Broker;
