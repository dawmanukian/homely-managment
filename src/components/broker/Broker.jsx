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
import ChangeItem from "../change-item/ChangeItem";
import ItemPage from "../item-page/ItemPage";

const Broker = ({ data }) => {
  return (
    <div className="page-data">
      <Router>
        <BrokerLeftMenu type={data.type} />
        <AccountData userData={data} />
        <Routes>
          <Route path="/*" element={<MyAnnouncements userData={data}/>} />
          <Route path={"/change/:itemId"} element={<ChangeItem userData={data}/>} />
          <Route path={"/item/:itemId"} element={<ItemPage />} />
          <Route path="/settings" element={<Settings userData={data}/>} />
          <Route path="/requests" element={<Requests userData={data}/>} />
          <Route path="/add" element={<AddItem userData={data}/>} />
          <Route path="/my_ads" element={<MyAnnouncements userData={data}/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default Broker;
