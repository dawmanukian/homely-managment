import React from "react";
import BrokerLeftMenu from "./broker-left-menu/BrokerLeftMenu";
import AccountData from "../account-data/AccountData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "../add-user/AddUser";
import AddItem from "../add-item/AddItem";
import Settings from "../settings/Settings";
import Requests from "./requests/Requests";

const Broker = ({ type }) => {
  return (
    <div className="page-data">
      <Router>
        <BrokerLeftMenu type={type} />
        <AccountData type={"Broker"} />
        <Routes>
          <Route path="/add" element={<AddItem type={'Broker'}/>}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/requests" element={<Requests />}/>
        </Routes>
      </Router>
    </div>
  );  
};

export default Broker;
