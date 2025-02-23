import React, { useContext } from "react";
import logo from "../assets/images/logo.png";
import Title from "antd/es/typography/Title";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AppContext);

  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(true);
      const { username, password } = values;

      const data = {
        accessToken:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBSS1tYXRoLWJhY2tlbmQiLCJpYXQiOjE3NDAxMTEwOTQsImV4cCI6MTc3MTY0NzA5NCwiYXVkIjoiIiwic3ViIjoiYWNjZXNzIHRva2VuIiwiYWNjb3VudF9pZCI6IjEiLCJyb2xlIjoiQURNSU4ifQ.sLpqemKHhPP_knMcXG0dFlsHOAy4wxLDGRplvhgfdIg",
      };
      login(data);
      const id = setTimeout(() => {
        setLoading(false);
        setError("Login failed!");
      }, 10000);
      clearTimeout(id);
      if (isAuthenticated) {
        navigate("/");
      } else setError("Login failed!");
    }, 2000);
  };

  return (
    <div className="grid place-items-center h-screen w-screen grid-cols-2 gap-x-20 px-10">
      <div className="h-1/2 col-span-1 w-full flex flex-col items-end justify-center -translate-y-20">
        <img src={logo} alt="login" className="h-full object-cover" />
      </div>
      <div className="col-span-1 flex flex-col items-start justify-start h-1/2 -translate-y-20 w-full">
        <Title
          level={1}
          style={{
            textAlign: "left",
            marginBottom: 24,
            color: "#85A900",
            width: "100%",
          }}
        >
          Đăng nhập
        </Title>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: "60%" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your username!" }]}
            style={{ marginBottom: 24 }}
          >
            <Input
              size="large"
              autoFocus="true"
              prefix={<UserOutlined />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Button type="link" htmlType="button">
                Forgot password?
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Login
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
