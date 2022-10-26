import { Spin } from "antd";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import LoginSuccess from "./components/LoginSuccess";
import Register from "./components/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChangeForm = (type) => {
    if (type === "login") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className="login-form">
        {!loginSuccess ? (
          <>
            <div className="action">
              <button onClick={() => handleChangeForm("register")}>
                Register
              </button>
              <button onClick={() => handleChangeForm("login")}>Sign in</button>
            </div>
            <h1>{isLogin ? "Login" : "Register"}</h1>
            <div className="content">
              {isLogin ? (
                <Login
                  setIsLoading={setIsLoading}
                  setLoginSuccess={setLoginSuccess}
                />
              ) : (
                <Register setIsLoading={setIsLoading} setIsLogin={setIsLogin} />
              )}
            </div>
          </>
        ) : (
          <LoginSuccess />
        )}
      </div>
    </Spin>
  );
}

export default App;
