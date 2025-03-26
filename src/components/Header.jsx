import React, { useContext, useEffect, useRef, useState } from "react";
import header_logo from "../assets/images/header_logo.png";
import { Badge, Button, Dropdown, Input, Menu, Spin } from "antd";
import {
  BellOutlined,
  LogoutOutlined,
  SearchOutlined,
  TrophyOutlined,
  UserOutlined,
  WalletOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import temp_avatar from "../assets/images/temp_avatar.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";

const Header = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = React.useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [notifications, setNotifications] = React.useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suggestions when search input changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim() === "") {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        // Replace with your actual API endpoint
        const response = await apiClient.get(
          `/api/lesson/grade/1/lessonname/${search}`
        );
        setSuggestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);
  }, [search]);

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

  const handlePressEnter = (e) => {
    const content = e.target.value;
    navigate(`/search?v=` + content);
  };

  const handleSearchIcon = () => {
    console.log(search);
  };

  const handleLessonButtonClick = (e) => {
    navigate(`/study/`);
  };

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/study/chapters/1/lessons/${suggestion.lessonOrder}/slide`);
    setShowSuggestions(false);
  };

  const menuUser = (
    <Menu>
      <Menu.Item key="0">
        <Link to={`/profile`}>
          <span className="text-[#85A900] flex flex-row items-center gap-x-2">
            <UserOutlined />
            Quản lý tài khoản
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key={1}>
        <Link to={`/achievements`}>
          <span className="text-[#85A900] flex flex-row items-center gap-x-2">
            <TrophyOutlined />
            Thành tựu
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to={`/my-wallet`}>
          <span className="text-[#85A900] flex flex-row items-center gap-x-2">
            <WalletOutlined />
            Ví của tôi
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key={4}>
        <button className="cursor-pointer" onClick={handleLogout}>
          <span className="text-[#85A900] flex flex-row items-center gap-x-2">
            <LogoutOutlined />
            Đăng xuất
          </span>
        </button>
      </Menu.Item>
    </Menu>
  );

  const activeStyle = "active font-bold text-xl";
  const inactiveStyle = "font-bold text-xl text-[#85A900] hover:underline";

  return (
    <header className="w-full flex flex-col">
      <div className="w-full min-h-20 h-6 py-4 flex flex-row justify-between items-center px-10 border-b-[1px] border-[#85A900] rounded-b-lg">
        <div className="h-full">
          <a className="h-full cursor-pointer" href="/">
            <img src={header_logo} className="h-full object-cover" />
          </a>
        </div>
        <div className="relative" ref={searchRef}>
          <Input
            value={search}
            onPressEnter={handlePressEnter}
            onChange={handleSearchInputChange}
            onFocus={() => setShowSuggestions(true)}
            size="large"
            style={{
              width: "800px",
              borderWidth: "1px",
              borderColor: "#85A900",
              borderRadius: "20px",
              fontWeight: "500",
              color: "#85A900",
            }}
            placeholder="Tìm kiếm theo tên chương, tên bài học..."
            suffix={
              <SearchOutlined
                onClick={handleSearchIcon}
                style={{ color: "#85A900" }}
              />
            }
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && (search.trim() !== "" || loading) && (
            <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="py-4 px-3 text-center">
                  <Spin size="small" />{" "}
                  <span className="ml-2 text-gray-500">Đang tìm kiếm...</span>
                </div>
              ) : suggestions.length > 0 ? (
                <div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors duration-200 border-b last:border-b-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <YoutubeOutlined className="text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Bài {suggestion.lessonOrder}:{" "}
                            {suggestion.lessonName}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Slide - Video - Bài tập
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gray-50 p-2 text-center">
                    <Link
                      to={`/search?v=${search}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      onClick={() => setShowSuggestions(false)}
                    >
                      Xem tất cả kết quả cho "{search}"
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="py-4 px-3 text-center text-gray-500">
                  Không tìm thấy bài học nào phù hợp
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-end items-center gap-x-6 h-full">
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
            placement="bottomRight"
            arrow
          >
            <Button
              size="large"
              style={{
                border: "none",
                backgroundColor: "#E4F4F8",
                color: "#85A900",
                padding: "4px 6px",
                borderRadius: "20px",
              }}
            >
              <div className="h-full flex flex-row items-center gap-x-2">
                <img src={temp_avatar} className="h-full object-cover" />
                <span>Mai Văn Minh</span>
              </div>
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className="w-full min-h-15 py-4 flex flex-row justify-center items-center px-10 bg-[#E4F4F8] gap-x-10">
        <Button type="text" onClick={handleLessonButtonClick}>
          <span
            className={
              location.pathname.startsWith("/study")
                ? activeStyle
                : inactiveStyle
            }
          >
            HỌC BÀI
          </span>
        </Button>
        <Link to="/kiem-tra-them">
          <Button type="text">
            <span
              className={
                location.pathname.startsWith("/kiem-tra-them")
                  ? activeStyle
                  : inactiveStyle
              }
            >
              KIỂM TRA THÊM
            </span>
          </Button>
        </Link>
        <Link to="/dien-dan">
          <Button type="text">
            <span
              className={
                location.pathname.startsWith("/dien-dan")
                  ? activeStyle
                  : inactiveStyle
              }
            >
              DIỄN ĐÀN
            </span>
          </Button>
        </Link>
        <Link to="/tro-choi-toan-hoc">
          <Button type="text">
            <span
              className={
                location.pathname.startsWith("/tro-choi-toan-hoc")
                  ? activeStyle
                  : inactiveStyle
              }
            >
              TRÒ CHƠI TOÁN HỌC
            </span>
          </Button>
        </Link>
        <Link to="/dau-truong">
          <Button type="text">
            <span
              className={
                location.pathname.startsWith("/dau-truong")
                  ? activeStyle
                  : inactiveStyle
              }
            >
              ĐẤU TRƯỜNG
            </span>
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
