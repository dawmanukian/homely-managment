import React, { useEffect, useState } from "react";
import "./index.css";
import Admin from "./components/admin/Admin";
import { useCookies } from "react-cookie";
import Broker from "./components/broker/Broker";
import Manager from "./components/manager/Manager";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/loading/Loading";
import axios from "axios";

function App() {
  const accType = "admin";

  const [cookies, setCookie] = useCookies(["token"]);
  const [logined, setLogined] = useState(true);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, "4000");

  function selectAcc() {
    switch (accType) {
      case "admin":
        return <Admin />;
      case "broker":
        return <Broker />;
      case "manager":
        return <Manager />;
    }
  }

  return <>{logined && (loading ? <Loading /> : selectAcc())}</>;
}

export default App;
