import { Form, notification, Spin } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/auth";

const Login = () => {
  const [form] = useForm();
  const { mutateAsync, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = form.getFieldsValue();
      const result = await mutateAsync(formData);
      if (result?.errorCode) {
        notification.error({
          description: result.data,
        });
      } else {
        notification.success({
          description: "Login success",
        });
        localStorage.setItem("user", JSON.stringify(result.data));
        localStorage.setItem("token", result.data?.token);
        localStorage.setItem("refreshToken", result.data?.refreshToken);
        navigate("/home");
      }
    } catch (error) {
      notification.error({
        description: "Login failed",
      });
    }
  };

  return (
    <Spin spinning={isLoading}>
      <div className="action">
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/")}>Sign in</button>
      </div>
      <h1 className="pl-[32px] pt-[20px]">Login</h1>
      <div className="content">
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <input type="email" placeholder="Email" autoComplete="nope" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </Form.Item>
          <button type="submit" className="submit-button">
            Login
          </button>
        </Form>
      </div>
    </Spin>
  );
};

export default Login;
