import { Form, notification, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../api/auth";

const Register = () => {
  const [form] = useForm();
  const { mutateAsync, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formData = form.getFieldsValue();
    try {
      const result = await mutateAsync(formData);
      if (result?.errorCode || !result) {
        notification.error({
          description: result.data,
        });
      } else {
        notification.success({
          description: "Register success",
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <h1>Register</h1>
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
      </div>
    </Spin>
  );
};

export default Register;
