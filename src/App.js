import React, { useEffect, useState } from "react";
import "./index.css";
import Admin from "./components/admin/Admin";
import { useCookies } from "react-cookie";
import Broker from "./components/broker/Broker";
import Manager from "./components/manager/Manager";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const accType = "admin";

  const [cookies, setCookie] = useCookies(["token"]);
  const [logined, setLogined] = useState(true);
  console.log(cookies);

  // useEffect(() => {
  //   if (!cookies.token) {
  //     window.location = "http://localhost:3000";
  //   } else {
  //     setLogined(true);
  //   }
  // }, []);

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

  return <>{logined && selectAcc()}</>;
}

export default App;
