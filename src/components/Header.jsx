import React, { useContext } from "react";
import header_logo from "../assets/images/header_logo.png";
import { Badge, Button, Dropdown, Menu } from "antd";
import { BellOutlined } from "@ant-design/icons";
import temp_avatar from "../assets/images/temp_avatar.png";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Header = () => {
  const { logout } = useContext(AppContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = React.useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]);

  const menuNotification = (
    <Menu>
      {notifications.map((notification, index) => (
        <Menu.Item key={index}>
          <Link to={`/notifications/${index + 1}`}>{notification}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuUser = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/profile`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <button className="cursor-pointer" onClick={handleLogout}>Logout</button>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to={`/notifications`}>Notifications</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header className="w-full min-h-20 h-6 py-4 flex flex-row justify-between items-center px-10 border-b-[2px] border-[#85A900] rounded-b-lg">
      <div className="h-full">
        <a className="h-full cursor-pointer" href="/dashboard">
          <img src={header_logo} className="h-full object-cover" />
        </a>
      </div>
      <div className="flex flex-row justify-end items-center gap-x-8 h-full">
        <Dropdown
          overlay={menuNotification}
          trigger={["click"]}
          placement="bottomCenter"
          arrow
        >
          <Badge count={notifications.length} offset={[-5, 10]}>
            <Button
              shape="circle"
              icon={<BellOutlined />}
              size="large"
              style={{
                border: "none",
                backgroundColor: "#E4F4F8",
                color: "#85A900",
              }}
            />
          </Badge>
        </Dropdown>

        <Dropdown
          overlay={menuUser}
          trigger={["click"]}
          placement="bottomLeft"
          arrow
        >
          <Button
            shape="circle"
            size="large"
            style={{
              border: "none",
              backgroundColor: "#E4F4F8",
              color: "#85A900",
            }}
          >
            <img src={temp_avatar} className="h-full object-cover" />
          </Button>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
