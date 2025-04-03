import React, { useState } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Typography, 
  notification, 
  Divider,
  Alert
} from "antd";
import { 
  MailOutlined,
  CheckCircleOutlined, 
  LoginOutlined,
  UserAddOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // Adjust path if needed

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    
    try {
      const host = window.location.origin;
      const response = await apiClient.get(
        `/account/forgot-password?email=${values.email}&host=${host}`
      );
      
      if (response.status === 200) {
        setSuccess(true);
        setEmail(values.email);
        notification.success({
          message: "Yêu cầu thành công",
          description: "Vui lòng kiểm tra email của bạn để đặt lại mật khẩu.",
          duration: 5,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.message || "Yêu cầu thất bại. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-[#80d0c7] via-[#85ffbd] to-[#fffb7d] p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <Title level={2} className="text-center text-[#85A900] mb-1">
            Quên mật khẩu
          </Title>
          <Text className="text-gray-500 text-center">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </Text>
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircleOutlined className="text-green-500 text-5xl mb-3" />
            <Title level={4} className="text-green-600">Yêu cầu đã được gửi!</Title>
            <Text className="block mb-3 text-gray-600">
              Chúng tôi đã gửi email đến <strong>{email}</strong> với hướng dẫn đặt lại mật khẩu.
            </Text>
            <Text className="block text-gray-500 text-sm mb-4">
              Nếu bạn không nhận được email trong vài phút tới, hãy kiểm tra thư mục spam hoặc thử lại.
            </Text>
            <Link to="/login">
              <Button 
                type="primary" 
                icon={<LoginOutlined />}
                className="bg-[#85A900] hover:bg-[#6c8a00]"
              >
                Quay lại trang đăng nhập
              </Button>
            </Link>
          </div>
        ) : (
          <Form
            form={form}
            name="forgot_password"
            onFinish={onFinish}
            layout="vertical"
            className="w-full"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" }
              ]}
              hasFeedback
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Nhập email đăng ký của bạn"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>
            
            <Form.Item className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
                className="h-12 rounded-lg bg-[#85A900] hover:bg-[#6c8a00] border-none"
              >
                Gửi yêu cầu
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

export default ForgotPassword;