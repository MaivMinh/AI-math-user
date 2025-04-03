import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  notification,
  Spin,
  Divider,
  Alert,
  message,
} from "antd";
import {
  LockOutlined,
  CheckCircleOutlined,
  LoginOutlined,
  UserAddOutlined,
  ArrowLeftOutlined,
  UserOutlined,
} from "@ant-design/icons";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Adjust path if needed
import { createGlobalState } from "react-use";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [form] = Form.useForm();

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");
  const token = params.get("token");

  if (!email || !token) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#80d0c7] via-[#85ffbd] to-[#fffb7d] p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <Alert
            message="Yêu cầu không hợp lệ"
            description="Link đổi mật khẩu không hợp lệ hoặc đã hết hạn. Vui lòng thử lại."
            type="error"
            showIcon
          />
          <div className="mt-6 flex justify-center">
            <Link to="/login">
              <Button
                type="primary"
                icon={<ArrowLeftOutlined />}
                className="bg-[#85A900] hover:bg-[#6c8a00]"
              >
                Quay lại trang đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onFinish = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/account/reset-password", {
        email: email,
        token: token,
        password: values.password,
      });
      setSuccess(true);
      notification.success({
        message: "Đổi mật khẩu thành công",
        description: "Bạn có thể đăng nhập với mật khẩu mới",
        duration: 5,
      });

      //Redirect after a delay
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setError(
        error.response?.data?.message ||
          "Đổi mật khẩu thất bại. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordValidationRules = [
    { required: true, message: "Vui lòng nhập mật khẩu!" },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      message:
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#80d0c7] via-[#85ffbd] to-[#fffb7d] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <Title level={2} className="text-center text-[#85A900] mb-1">
            Đặt lại mật khẩu
          </Title>
        </div>

        {error && (
          <Alert
            message="Lỗi"
            description={error}
            type="error"
            showIcon
            className="mb-4"
          />
        )}

        {success ? (
          <div className="text-center py-4">
            <CheckCircleOutlined className="text-green-500 text-5xl mb-3" />
            <Title level={4} className="text-green-600">
              Đổi mật khẩu thành công!
            </Title>
            <Text className="block mb-4">
              Bạn sẽ được chuyển hướng đến trang đăng nhập...
            </Text>
            <Spin />
          </div>
        ) : (
          <Form
            form={form}
            name="reset_password"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
          >
            <Form.Item
              name="password"
              label="Mật khẩu mới"
              rules={passwordValidationRules}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Nhập mật khẩu mới"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    /// Lấy dữ liệu ở trong confirm password input ra.
                    /// So sánh với password input.
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
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Xác nhận mật khẩu mới"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item className="mt-10">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="h-12 rounded-lg bg-[#85A900] hover:bg-[#6c8a00] border-none"
              >
                Đặt lại mật khẩu
              </Button>
            </Form.Item>

            <Divider className="my-4">
              <span className="text-gray-400">hoặc</span>
            </Divider>

            <div className="flex justify-between gap-4 mt-4">
              <Link to="/login" className="flex-1">
                <Button
                  block
                  icon={<LoginOutlined />}
                  size="large"
                  className="rounded-lg border-[#85A900] text-[#85A900] hover:text-[#6c8a00] hover:border-[#6c8a00]"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/register" className="flex-1">
                <Button
                  block
                  icon={<UserAddOutlined />}
                  size="large"
                  className="rounded-lg border-[#B18CFE] text-[#B18CFE] hover:text-[#9370db] hover:border-[#9370db]"
                >
                  Đăng ký
                </Button>
              </Link>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
