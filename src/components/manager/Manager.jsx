import React from "react";
import AccountData from "../account-data/AccountData";
import ManagerLeftMenu from "./manager-left-menu/ManagerLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "../add-item/AddItem";
import Settings from "../settings/Settings";
import Announcements from "../announcements/Announcements";
import ChangeItem from "../change-item/ChangeItem";
import ItemPage from "../item-page/ItemPage";

const Manager = ({data}) => {
  return (
    <div className="page-data">
      <Router>
        <ManagerLeftMenu type={data.type} />
        <AccountData userData={data} />
        <Routes>
          <Route path="/*" element={<Announcements userData={data}/>} />
          <Route path={"/change/:itemId"} element={<ChangeItem userData={data}/>} />
          <Route path="/settings" element={<Settings userData={data}/>} />
          <Route path="/add" element={<AddItem userData={data}/>} />
          <Route path={"/item/:itemId"} element={<ItemPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Manager;
