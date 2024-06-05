import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GrMenu } from "react-icons/gr";
import "./mobile-left-menu.css";
import AdminLeftMenu from "../admin/admin-left-menu/AdminLeftMenu";
import ManagerLeftMenu from "../manager/manager-left-menu/ManagerLeftMenu";
import BrokerLeftMenu from "../broker/broker-left-menu/BrokerLeftMenu";

const MobileLeftMenu = ({type}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const select_acc = () => {
    switch (type) {
      case 'admin':
        return <AdminLeftMenu />
      case 'manager':
        return <ManagerLeftMenu />
      case 'broker':
        return <BrokerLeftMenu />
    }
  }

  return (
    <div>
      <button onClick={handleShow} className="open-btn">
        <GrMenu className="drop-icon" />
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body onClick={() => handleClose()}>
          {select_acc()}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default MobileLeftMenu;
