import React from "react";
import BrokerLeftMenu from "./broker-left-menu/BrokerLeftMenu";
import AccountData from "../account-data/AccountData";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "../add-user/AddUser";
import AddItem from "../add-item/AddItem";
import Settings from "../settings/Settings";
import Requests from "./requests/Requests";
import Announcements from "../announcements/Announcements";
import MyAnnouncements from "./my-announcements/MyAnnouncements";

const Broker = ({ type }) => {
  return (
    <div className="page-data">
      <Router>
        <BrokerLeftMenu type={type} />
        <AccountData type={"Broker"} />
        <Routes>
          <Route path="/*" element={<AddItem type={'Broker'}/>} />
          <Route path="/settings" element={<Settings />}/>
          <Route path="/requests" element={<Requests />}/>
          <Route path="/all_ads" element={<Announcements />} />
          <Route path="/my_ads" element={<MyAnnouncements />} />
        </Routes>
      </Router>
    </div>
  );  
};

export default Broker;
