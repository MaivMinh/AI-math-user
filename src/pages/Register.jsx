import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { Alert, Button, Form, Input, Modal, notification } from "antd";
import {
  CheckCircleOutlined,
  FieldTimeOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import register_background from "../assets/images/register_background.png";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const openNotification = (desc) => {
    api.warning({
      message: "Thông báo",
      description: desc,
      placement: "topRight",
      duration: 5,
    });
  };

  const onFinish = async (form) => {
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      openNotification("Mật khẩu không khớp. Vui lòng kiểm tra lại.");
      return;
    }

    const registration = {
      userName: form.fullname,
      email: form.email,
      phoneNumber: form.phoneNumber,
      password: form.password,
      dob: form.dateOfBirth,
    };
    console.log(registration);
    try {
      const response = await apiClient.post(
        "/account/register/user",
        registration
      );
      navigate("/login?registered=true");
    } catch (error) {
      warning(
        "Đã xảy ra lỗi trong quá trình đăng kí tài khoản. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false);
    }
  };

  const warning = (message) => {
    Modal.warning({
      title: "Thông báo",
      content: message,
    });
  };

  const width = loading ? "50%" : 150;
  const background = loading ? "#B18CFE" : "#85A900";

  const passwordValidationRules = [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.",
    },
  ];

  return (
    <div
      className="h-[650px] w-6xl shadow-md m-auto mt-10 grid grid-cols-2 rounded-2xl "
      style={{
        backgroundImage: `url(${register_background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {contextHolder}
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
          Đăng kí
        </p>
        <p className="ml-8 mt-2 text-lg text-[#B18CFE] w-full text-wrap">
          Hãy tạo tài khoản của bạn và hoàn toàn miễn phí!
        </p>
        <Form
          name="register-form"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          style={{ width: "100%", padding: "0 24px", marginTop: 32 }}
        >
          <Form.Item name={"fullname"} style={{ marginBottom: 36 }}>
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Họ và tên</span>
              </p>
              <Input
                type="text"
                size="large"
                autoFocus={true}
                placeholder="Lionel Messi..."
                prefix={
                  <UserOutlined
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                      color: "#B18CFE",
                      fontSize: "1rem",
                    }}
                  />
                }
              />
            </div>
          </Form.Item>
          <Form.Item name={"email"} style={{ marginBottom: 36 }}>
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Email</span>
              </p>
              <Input
                type="email"
                size="large"
                placeholder="example@gmail.com"
                prefix={
                  <MailOutlined
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                      color: "#B18CFE",
                      fontSize: "1rem",
                    }}
                  />
                }
              />
            </div>
          </Form.Item>
          <Form.Item name={"dateOfBirth"} style={{ marginBottom: 36 }}>
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Ngày sinh</span>
              </p>
              <Input defaultValue={"1975-04-30"} type="date" size="large" />
            </div>
          </Form.Item>
          <Form.Item name={"phoneNumber"} style={{ marginBottom: 36 }}>
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Số điện thoại</span>
              </p>
              <Input
                type="text"
                size="large"
                placeholder="0123456789"
                prefix={
                  <PhoneOutlined
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "1rem",
                      transform: "translateY(-50%)",
                      color: "#B18CFE",
                      fontSize: "1rem",
                    }}
                  />
                }
              />
            </div>
          </Form.Item>
          <Form.Item
            name={"password"}
            style={{ marginBottom: 36 }}
            rules={passwordValidationRules}
            hasFeedback
          >
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Mật khẩu</span>
              </p>
              <Input.Password
                name="password"
                size="large"
                placeholder="Mật khẩu..."
              />
            </div>
          </Form.Item>
          <Form.Item
            name={"confirmPassword"}
            style={{ marginBottom: 36 }}
            dependencies={["password"]}
            hasFeedback
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <div className="relative">
              <p className="absolute -top-6 flex flex-row gap-x-1 items-center justify-center">
                <span className="text-red-600">*</span>
                <span className="text-gray-500 text-sm">Nhập lại mật khẩu</span>
              </p>
              <Input.Password
                type="password"
                size="large"
                placeholder="Xác nhận mật khẩu..."
              />
            </div>
          </Form.Item>
          <p className="flex flex-row items-center justify-between w-full">
            <p>
              Bạn đã có tài khoản?{" "}
              <Link to="/login" className="text-[#B18CFE]">
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
