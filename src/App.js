import React, { useEffect, useState } from "react";
import "./index.css";
import Admin from "./components/admin/Admin";
import { useCookies } from "react-cookie";
import Broker from "./components/broker/Broker";
import Manager from "./components/manager/Manager";
import "bootstrap/dist/css/bootstrap.min.css";
import Loading from "./components/loading/Loading";
import axios from "axios";
import Login from "./components/login/Login";

function App() {
  const [token, setToken] = useState(localStorage.getItem("auth_token"))
  const [accType, setAccType] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const res = await axios.post("https://service.homely.am/api/auth/login", {
            token,
          });
          if (res.data.success) {
            setAccType(res.data.data.type);
            setUserData(res.data.data);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) return <Loading />;

  if (userData) {
    switch (accType) {
      case "admin":
        return <Admin data={userData} />;
      case "broker":
        return <Broker data={userData} />;
      case "manager":
        return <Manager data={userData} />;
      default:
        return <Login onGetData={(token) => setToken(token)}/>;
    }
  }

  return <Login onGetData={(token) => setToken(token)}/>;
}

export default App;