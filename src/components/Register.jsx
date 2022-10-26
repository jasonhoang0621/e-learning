import { Form, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import auth from "../api/auth";

const Register = ({ setIsLoading, setIsLogin }) => {
  const [form] = useForm();

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    try {
      setIsLoading(true);
      const result = await auth.register(formData);
      if (result?.errorCode || !result) {
        notification.error({
          description: result.data,
        });
      } else {
        notification.success({
          description: "Register success",
        });
        setIsLogin(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
      <Form.Item
        name="rePassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <input
          type="password"
          placeholder="Re-enter password"
          autoComplete="new-password"
        />
      </Form.Item>
      <button type="submit" className="submit-button">
        Register
      </button>
    </Form>
  );
};

export default Register;
