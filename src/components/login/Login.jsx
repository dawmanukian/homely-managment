import React, { useState } from "react";
import "./login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const Login = ({onGetData}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://service.homely.am/api/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("auth_token", res.data.token);
        onGetData(res.data.token)
      } else {
        setError("Էլ․հասցեն կամ գաղտնաբառը սխալ է նշված");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <form
        onSubmit={(evn) => {
          evn.preventDefault();
          login();
        }}
      >
        <h3>Homely Team</h3>
        <Form.Label htmlFor="inputPassword5">Էլ․ հասցե</Form.Label>
        <Form.Control
          value={email}
          onChange={(evn) => setEmail(evn.target.value)}
          type="email"
          required
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        <Form.Label htmlFor="inputPassword5">Գաղտնաբառ</Form.Label>
        <Form.Control
          value={password}
          onChange={(evn) => setPassword(evn.target.value)}
          type="password"
          required
          id="inputPassword5"
          aria-describedby="passwordHelpBlock"
        />
        <Button type="submit" variant="secondary" disabled={loading}>
          Մուտք
        </Button>
        <span style={{ color: "red", marginTop: "10px" }}>{error}</span>
      </form>
    </div>
  );
};

export default Login;
