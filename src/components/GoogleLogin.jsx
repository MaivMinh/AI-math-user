import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spin } from "antd";

const GoogleLogin = () => {
  const navigate = useNavigate();
  const { auth, login } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const handleGoogleLogin = async () => {
        try {
          // Get token from cookies
          const accessToken = Cookies.get("ACCESS_TOKEN");

          if (!accessToken) {
            setError("No authentication token found");
            setLoading(false);
            return;
          }

          // Optionally store token in localStorage if needed by your app
          localStorage.setItem("access-token", accessToken);

          // Update auth context with user info and token
          login(accessToken);

          // Redirect to home page
          navigate("/", { replace: true });
        } catch (error) {
          console.error("Google login error:", error);
          setError("Authentication failed");
        } finally {
          setLoading(false);
        }
      };
      handleGoogleLogin();
    }
  }, [auth]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <Spin size="large" />
        <p className="mt-4 text-gray-600">Đang xác thực...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 p-4 rounded-md border border-red-200 max-w-md">
          <h2 className="text-red-600 text-lg font-medium mb-2">
            Đăng nhập thất bại
          </h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Quay lại trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GoogleLogin;
