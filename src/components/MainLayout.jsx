import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  InsertRowRightOutlined,
  BugOutlined,
  DollarCircleOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";

const MainLayout = () => {
  const menuItems = [
    {
      label: "Dashboard",
      key: "/dashboard",
      icon: <PieChartOutlined />,
    },
    {
      label: "Quản lý người dùng",
      key: "/user-management",
      icon: <UserOutlined />,
    },
    {
      label: "Quản lý lỗi",
      key: "/error-management",
      icon: <BugOutlined />,
    },
    {
      label: "Quản lý thanh toán",
      key: "/payment-management",
      icon: <BankOutlined />,
    },
    {
      label: "Lịch sử thanh toán",
      key: "/payment-history",
      icon: <DollarCircleOutlined />,
    },
    {
      label: "Quản lý bài học",
      key: "/lesson-management",
      icon: <InsertRowRightOutlined />,
    },
  ];

  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="mt-10">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
