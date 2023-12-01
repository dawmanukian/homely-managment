import React from "react";
import AccountData from "../account-data/AccountData";
import ManagerLeftMenu from "./manager-left-menu/ManagerLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "../add-item/AddItem";
import Settings from "../settings/Settings";
import Announcements from "../announcements/Announcements";

const Manager = ({ type }) => {
  return (
    <div className="page-data">
      <Router>
        <ManagerLeftMenu type={type} />
        <AccountData type={"Manager"} />
        <Routes>
          <Route path="/*" element={<AddItem />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/all_ads" element={<Announcements />}/>
        </Routes>
      </Router>
    </div>
  );
};

export default Manager;
