import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))?.email) {
      setEmail(JSON.parse(localStorage.getItem("user"))?.email);
    }
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-success">
      <div className="login-success-header">
        <h1>Login success</h1>
        <h3 onClick={handleLogout}>Logout</h3>
      </div>
      <p>
        <b>Email: </b>
        {email}
      </p>
      <p>
        <b>Token: </b>
        {token}
      </p>
    </div>
  );
};

export default LoginSuccess;
