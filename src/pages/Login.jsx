import React, { useContext, useEffect } from "react";
import logo from "../assets/images/logo.png";
import Title from "antd/es/typography/Title";
import { UserOutlined, LockOutlined, SyncOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  notification,
  Space,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../assets/images/google.png";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";

const Login = () => {
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const registered = params.get("registered");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, title, description, duration) => {
    api[type]({
      message: title,
      description: description,
      duration: duration,
    });
  };
  const from = location.state?.from?.pathname || "/"; // Redirect after login
  const { login, auth } = useContext(AuthContext);

  useEffect(() => {
    if (registered && registered === "true") {
      openNotificationWithIcon(
        "success",
        "Đăng kí tài khoản thành công!",
        "",
        4
      );
      setTimeout(() => {
        openNotificationWithIcon(
          "success",
          "Kích hoạt tài khoản",
          "Email đã được gửi đến địa chỉ của bạn. Vui lòng kiểm tra email để kích hoạt tài khoản.",
          0
        );
      }, 3500);
    }
  }, [registered]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await apiClient.post("/account/login", {
        email: values.email,
        password: values.password,
      });
      const { jwtToken } = response.data;
      login(jwtToken);
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response?.data?.message || "Đăng nhập thất bại");
      return;
    } finally {
      setLoading(false);
    }
  };
  
  const width = loading ? "100%" : 150;
  const background = loading ? "#B18CFE" : "#85A900";

  return (
    <div className="relative bg-gradient-to-tr from-[#80d0c7] via-[#85ffbd] to-[#fffb7d] overflow-hidden grid place-items-center min-h-screen w-screen grid-cols-2 gap-x-32 px-10">
      {contextHolder}
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
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
            style={{ marginBottom: 24 }}
          >
            <Input
              size="large"
              autoFocus="true"
              prefix={<UserOutlined />}
              style={{ color: "#85A900" }}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              style={{ color: "#85A900" }}
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item style={{ width: "100%" }}>
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
                onClick={() => navigate("/forgot-password/")}
              >
                Quên mật khẩu?
              </Button>
            </Space>
            <Space
              style={{
                marginTop: 6,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                fontSize: 18,
              }}
            >
              <span className="text-gray-500 text-sm">Chưa có tài khoản?</span>
              <Link to={"/register"}>
                <span className="text-blue-600 text-sm">Đăng kí</span>
              </Link>
            </Space>
            <div className="mt-6 w-full flex flex-row items-center justify-center">
              <Button
                type="primary"
                style={{
                  background: "#85A900",
                  display: "flex",
                  alignItems: "center",
                  width: width,
                  background: background,
                  fontWeight: "500",
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
            </div>
            <div className="md:mt-8 md:flex md:flex-col md:items-center md:justify-center md:w-full hidden ">
              <p className="grid grid-cols-10 w-full gap-x-2">
                <p className="h-[1px] bg-gray-700 col-span-3"></p>
                <p className="col-span-4 font-semibold -translate-y-1/2 text-md flex flex0row items-center justify-center">
                  <span className="text-center text-gray-500">
                    hoặc đăng nhập với
                  </span>
                </p>
                <p className="h-[1px] bg-gray-700 col-span-3"></p>
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
              <a href="https://mathai.id.vn/account/login/google?returnUrl=http://localhost:5173/account/login/google">
                <img src={google} width={40} className="object-cover" />
              </a>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
