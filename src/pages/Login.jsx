import React, { useContext } from "react";
import logo from "../assets/images/logo.png";
import Title from "antd/es/typography/Title";
import {
  UserOutlined,
  LockOutlined,
  SyncOutlined,
  FacebookOutlined,
  FacebookFilled,
} from "@ant-design/icons";
import { Alert, Button, Checkbox, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import facebook from "../assets/images/facebook.png";
import google from "../assets/images/google.png";

const Login = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AppContext);

  const onFinish = (values) => {
    setLoading(true);
    const data = {
      accessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBSSBNYXRoIGFwcGxpY2F0aW9uIiwiaWF0IjoxNzQwNzE3OTYzLCJleHAiOjE3NzIyNTM5NjMsImF1ZCI6IiIsInN1YiI6ImFjY2VzcyB0b2tlbiIsInJvbGUiOiJVU0VSIiwiYWNjb3VudF9pZCI6IjEiLCJncmFkZSI6IjEifQ.L6gDofA9j5NRpclABN3Ahjtr490niBz48mhqagGChPw",
    };
    setTimeout(() => {
      setLoading(false);
      login(data);
      navigate("/"); // redirect to home page
    }, 3000);
  };

  const width = loading ? 384 : 100;
  const background = loading ? "#B18CFE" : "#85A900";

  return (
    <div className="login-background grid place-items-center min-h-screen w-screen grid-cols-2 gap-x-20 px-10">
      <div className="h-1/2 col-span-1 w-full flex flex-col items-end justify-center">
        <img src={logo} alt="login" className="h-full object-cover" />
      </div>
      <div className="col-span-1 flex flex-col items-start justify-start h-1/2 w-full ">
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
              style={{ color: "#85A900" }}
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
              style={{ color: "#85A900" }}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Checkbox
                style={{
                  color: "gray",
                  fontWeight: "500",
                }}
              >
                Lưu thông tin
              </Checkbox>
              <Button
                type="link"
                htmlType="button"
                style={{ padding: 0, color: "#B18CFE", fontWeight: "700" }}
              >
                Quên mật khẩu?
              </Button>
            </Space>
            <Space
              style={{
                marginTop: 24,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                type="primary"
                style={{
                  background: "#85A900",
                  display: "flex",
                  alignItems: "center",
                  width: width,
                  background: background,
                  fontWeight: "400",
                  transition: "500ms",
                }}
                size="large"
                htmlType="submit"
              >
                {loading ? (
                  <span className="flex flex-row items-center justify-center gap-x-2">
                    {" "}
                    <SyncOutlined spin /> Đang đăng nhập...
                  </span>
                ) : (
                  <span>Đăng nhập</span>
                )}
              </Button>
            </Space>
            <div className="md:mt-8 md:flex md:flex-col md:items-center md:justify-center md:w-full hidden ">
              <p className="grid grid-cols-10 w-full">
                <p className="h-[1px] bg-gray-700 col-span-3 mr-5"></p>
                <span className="col-span-4 -translate-y-1/2 font-semibold text-md">
                  hoặc đăng nhập với
                </span>
                <p className="h-[1px] bg-gray-700 col-span-3 ml-0"></p>
              </p>
            </div>
            <Space
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <Link to="/auth/facebook">
                <img src={facebook} width={40} className="object-cover" />
              </Link>
              <Link to="/auth/google">
                <img src={google} width={40} className="object-cover" />
              </Link>
            </Space>
            <Space
              style={{
                marginTop: 24,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                fontSize: 18,
              }}
            >
              <span className="text-gray-400 text-md">Chưa có tài khoản?</span>
              <span className="text-blue-600">Đăng kí</span>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
