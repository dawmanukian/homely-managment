import React from "react";
import AdminLeftMenu from "./admin-left-menu/AdminLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountData from "../account-data/AccountData";
import AddItem from "../add-item/AddItem";
import AddUser from "../add-user/AddUser";
import AllManagers from "./all-managers/AllManagers";
import AllBrokers from "./all-brokers/AllBrokers";
import Settings from "../settings/Settings";

const Admin = ({type}) => {
  return (
    <div className="page-data">
      <Router>
        <AdminLeftMenu type={type}/>
        <Routes>
          <Route path={"/add_user"} element={<AddUser />} />
          <Route path={"/add"} element={<AddItem />} />
          <Route path={"/managers"} element={<AllManagers />}/>
          <Route path={"/brokers"} element={<AllBrokers />} />
          <Route path={"/settings"} element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Admin;
