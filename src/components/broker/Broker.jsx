import React from "react";
import BrokerLeftMenu from "./broker-left-menu/BrokerLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "../add-user/AddUser";

const Broker = () => {
  return (
    <div className="page-data">
      <Router>
        <BrokerLeftMenu />
        <Routes>
  
        </Routes>
      </Router>
    </div>
  );
};

export default Broker;
