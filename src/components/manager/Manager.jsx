import React from "react";
import ManagerLeftMenu from "./manager-left-menu/ManagerLeftMenu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Manager = () => {
  return (
    <div className="page-data">
      <Router>
        <ManagerLeftMenu />
        <Routes>
          <Route />
        </Routes>
      </Router>
    </div>
  );
};

export default Manager;
