import { Form, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import auth from "../api/auth";

const Login = ({ setIsLoading, setLoginSuccess }) => {
  const [form] = useForm();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = form.getFieldsValue();
      const result = await auth.login(formData);
      if (result?.errorCode || !result) {
        notification.error({
          description: result.data,
        });
      } else {
        notification.success({
          description: "Login success",
        });
        localStorage.setItem("user", JSON.stringify(result.data));
        localStorage.setItem("token", result.data?.token);
        setLoginSuccess(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      notification.error({
        description: "Login failed",
      });
      setIsLoading(false);
    }
  };

  return (
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
  );
};

export default Login;
