import { useState } from "react";
import { Button, Carousel, Drawer, Input, message } from "antd";
import { MessageOutlined, TrophyFilled } from "@ant-design/icons";
import React from "react";
import logo_v2 from "../assets/images/logo_v2.png";
import { useNavigate } from "react-router-dom";
import chatbotSerivce from "../services/chatbotService";
import TextArea from "antd/es/input/TextArea";

const Home = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#527BF6",
  };

  const handleClick = () => {
    navigate("/nap-xu");
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const showError = (message) => {
    messageApi.open({
      type: "error",
      content: message,
    });
  };

  const handleSendMessage = async (message) => {
    if (message.trim() === "") return;
    const newMessage = { content: message, type: "sent" };
    setMessages([...messages, newMessage]);
    setInputValue("");

    try {
      const payload = {
        question: message,
        context: "string",
      };

      const response = await chatbotSerivce.post(
        "/chatbot-system/chat",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: false,
        }
      );

      const answer = response.data.answer;
      const receivedMessage = { content: answer, type: "received" };
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    } catch (error) {
      showError("Có lỗi xảy ra khi gửi tin nhắn!");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="min-h-screen w-[90%] mx-auto relative">
      {contextHolder}
      <div className="carousel">
        <Carousel
          autoplay={{
            dotDuration: true,
          }}
          autoplaySpeed={5000}
          speed={1000}
        >
          <div style={contentStyle}>
            <h3 style={contentStyle} className="grid grid-cols-10 h-full">
              <p className="col-span-2 h-full">
                <img
                  src={logo_v2}
                  alt="logo"
                  className="mx-auto w-4/5 h-4/5 my-[10%] rounded-xl object-cover"
                />
              </p>
              <p className="col-span-8 flex flex-col items-start justify-start h-4/5 my-[2.5%] gap-y-5">
                <h3 className="text-2xl font-bold text-white">
                  Nguyễn Hữu Thương
                </h3>
                <p className="text-lg text-white">Lớp 3</p>
                <p className="text-lg text-white">Ví của bạn: 0 xu</p>
                <Button
                  onClick={handleClick}
                  type="primary"
                  style={{ backgroundColor: "orange" }}
                  className="mt-2"
                >
                  Nạp xu
                </Button>
              </p>
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
          <div>
            <h3 style={contentStyle}>4</h3>
          </div>
        </Carousel>
      </div>
      <div className="w-full">
        <div className="w-full mb-10">
          <h1 className="text-2xl font-bold text-left mt-5">Đang học</h1>
        </div>
        <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-2 md:grid-cols-3 md:gap-x-3 md:gap-y-3 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-5 mx-auto">
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
          <div className="w-[280px] h-[300px] bg-emerald-400 rounded-2xl"></div>
        </div>
      </div>
      <div className="w-full mt-20">
        <div className="w-full mb-10">
          <h1 className="text-2xl font-bold text-left mt-5">Chương học</h1>
        </div>
        <div className="w-full overflow-x-auto whitespace-nowrap">
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            1
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            2
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            3
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            4
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            5
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            6
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            7
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            8
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            9
          </div>
          <div className="inline-block mr-10 w-[200px] h-[200px] bg-red-400 rounded-xl">
            10
          </div>
          <div className="inline-block w-[200px] h-[200px] bg-red-400 rounded-xl">
            11
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 right-5">
        <Button
          type="primary"
          shape="circle"
          icon={<MessageOutlined />}
          size="large"
          onClick={showDrawer}
        />
      </div>
      <Drawer title="Chatbot" onClose={onClose} open={open} size="large">
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-3">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`p-2 my-2 rounded-lg ${
                  message.type === "sent"
                    ? "bg-blue-500 text-white self-end max-w-[60%]"
                    : "bg-gray-300 text-black text-center max-w-[90%]"
                }`}
              >
                {message.content}
              </p>
            ))}
          </div>
          <div className="p-3 border-t flex flex-col">
            <TextArea
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Nhập tin nhắn..."
            />
            <Button
              type="primary"
              onClick={handleSendMessage}
              className="mt-2 self-end"
            >
              Gửi
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Home;

const sentMessageStyle = {};

const receivedMessageStyle = {};
