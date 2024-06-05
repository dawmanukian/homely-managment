import React, { useState } from "react";
import AdminLeftMenu from "./admin-left-menu/AdminLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountData from "../account-data/AccountData";
import AddItem from "../add-item/AddItem";
import AddUser from "../add-user/AddUser";
import AllManagers from "./all-managers/AllManagers";
import AllBrokers from "./all-brokers/AllBrokers";
import Settings from "../settings/Settings";
import Announcements from "../announcements/Announcements";
import ChangeItem from "../change-item/ChangeItem";
import ItemPage from "../item-page/ItemPage";

const Admin = ({ data }) => {
  const [pageName, setPageName] = useState("");

  return (
    <div className="page-data">
      <Router>
        <AdminLeftMenu type={data.type} />
        <AccountData userData={data} pageName={pageName} />
        <Routes>
          <Route path={"/*"} element={<Announcements userData={data} />} />
          <Route
            path={"/change/:itemId"}
            element={<ChangeItem userData={data} />}
          />
          <Route path={"/add"} element={<AddItem userData={data} />} />
          <Route path={"/managers"} element={<AllManagers userData={data} />} />
          <Route path={"/brokers"} element={<AllBrokers userData={data} />} />
          <Route path={"/settings"} element={<Settings userData={data} />} />
          <Route path={"/item/:itemId"} element={<ItemPage />} />
          <Route
            path={"/add_user"}
            element={<AddUser userData={data} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default Admin;
