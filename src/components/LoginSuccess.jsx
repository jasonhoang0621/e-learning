import { useIsFetching } from "@tanstack/react-query";
import { notification, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../api/auth";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const { refetch, isRefetching } = useProfile(false);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleVerify = () => {
    refetch().then((res) => {
      if (res?.errorCode) {
        notification.error({
          description: res.data,
        });
      } else {
        notification.success({
          description: "Verify success",
        });
      }
    });
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
    <Spin spinning={isRefetching}>
      <div className="login-success">
        <div className="login-success-header">
          <h1 className="text-3xl font-bold m-0">Login success</h1>
          <div className="flex">
            <h3 className="text-lg" onClick={handleVerify}>
              Verify
            </h3>
            <h3 className="ml-3 text-lg" onClick={handleLogout}>
              Logout
            </h3>
          </div>
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
    </Spin>
  );
};

export default LoginSuccess;
