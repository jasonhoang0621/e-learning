import React from "react";

const LoginSuccess = () => {
  const email = JSON.parse(localStorage.getItem("user"))?.email;
  const token = localStorage.getItem("token");

  return (
    <div className="login-success">
      <h1>Login success</h1>
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
