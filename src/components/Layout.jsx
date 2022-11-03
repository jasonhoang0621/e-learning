import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <div className="login-form">
      <div className="action">
        <button onClick={() => navigate("register")}>Register</button>
        <button onClick={() => navigate("")}>Sign in</button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
