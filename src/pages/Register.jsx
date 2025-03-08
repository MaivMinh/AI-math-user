import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Button, Form } from "antd";
import { SyncOutlined, UserOutlined } from "@ant-design/icons";
import Input from "../components/Input";
import register_background from "../assets/images/register_background.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = (values) => {
    setLoading(true);
    const registration = {
      username: values.username,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const width = loading ? "50%" : 150;
  const background = loading ? "#B18CFE" : "#85A900";

  return (
    <div
      className="h-[650px] w-6xl shadow-md mx-auto mt-10 grid grid-cols-2 rounded-2xl "
      style={{
        backgroundImage: `url(${register_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="col-span-1 rounded-l-2xl flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 950 250"
          width="0"
          height="0"
        >
          <clipPath id="clip">
            <path
              // Adjust these numbers to change the curve
              d="M140 0s80 100 0 650 0 125 0 125h810V0H140z"
              transform="scale(-1,1) translate(-700, 0)"
            />
          </clipPath>
        </svg>

        <div className="w-full flex flex-row items-center justify-center">
          <img src={logo} className="object-cover w-1/2" />
        </div>
        <p className="w-4/5 text-center text-white mt-10 text-xl">
          lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum
          dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="col-span-1 bg-white rounded-r-2xl flex flex-col items-center justify-start">
        <p className="text-3xl font-bold text-[#B18CFE] mt-10 text-left w-full ml-8">
          Register
        </p>
        <p className="ml-8 mt-2 text-lg text-[#B18CFE] w-full text-wrap">
          Creat your account! It's free and only takes a minute.
        </p>
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}
        <Form
          name="register-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: "100%", padding: "0 24px", marginTop: 24 }}
        >
          <Form.Item name={"username"} style={{ marginBottom: 24 }}>
            <Input
              name={"username"}
              type={"username"}
              label={"Tên đăng nhập"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </Form.Item>
          <Form.Item name={"email"} style={{ marginBottom: 24 }}>
            <Input
              name={"email"}
              type={"email"}
              label={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={"phoneNumber"} style={{ marginBottom: 24 }}>
            <Input
              name={"phoneNumber"}
              type={"text"}
              label={"Số điện thoại"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={"password"} style={{ marginBottom: 24 }}>
            <Input
              name={"password"}
              type={"password"}
              label={"Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item name={"confirmPassword"} style={{ marginBottom: 24 }}>
            <Input
              name={"confirmPassword"}
              type={"password"}
              label={"Nhập lại mật khẩu"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Item>
          <p className="flex flex-row items-center justify-between w-full">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-[#B18CFE] text-lg">
                Đăng nhập
              </Link>
            </p>
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
              <p className="flex flex-row items-center justify-center w-full gap-x-3">
                {loading && <SyncOutlined spin />}
                <span>Đăng kí</span>
              </p>
            </Button>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Register;
