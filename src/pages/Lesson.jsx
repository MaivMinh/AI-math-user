import { Button, Form, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  EditOutlined,
  FilePdfOutlined,
  LeftCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Slide from "../components/Slide";
import Video from "../components/Video";
import Quiz from "../components/Quiz";
import TextArea from "antd/es/input/TextArea";
import Comment from "../components/Comment";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";

const commentItems = [
  {
    user_id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    timestamp: "04:25 2022-01-01",
    content: "Bài giảng rất hay",
    likeNums: 10,
    replies: [
      {
        name: "Nguyễn Văn B",
        avatar: "https://randomuser.me/api/portraits/men/76.jpg",
        timestamp: "08:30 2022-01-01",
        content: "Bài giảng rất hay",
      },
      {
        name: "Nguyen Van C",
        avatar: "https://randomuser.me/api/portraits/men/77.jpg",
        timestamp: "08:30 2022-01-01",
        content: "Bài giảng rất hay",
      },
    ],
  },
  {
    user_id: 2,
    name: "Nguyễn Văn B",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    timestamp: "08:30 2022-01-01",
    content: "Bài giảng rất hay",
    likeNums: 10,
    replies: [],
  },
];

const Lesson = () => {
  const { auth } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [comments, setComments] = React.useState(commentItems);
  const [text, setText] = React.useState("");
  const { chapterOrder, lessonOrder, artifact } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (auth.grade) {
      const fetchContent = async () => {
        switch (artifact) {
          case "slide":
            setSelectedKey("1");
            break;
          case "video":
            setSelectedKey("2");
            break;
          case "exercise":
            setSelectedKey("3");
            break;
          default:
            setSelectedKey("1");
        }

        const response = await apiClient.get(
          `/api/chapters/grade/${auth.grade}/details`
        );
        const data = response.data;
        setChapters(data);
      };
      fetchContent();
    }
  }, [auth, chapterOrder, lessonOrder, artifact]);

  const chapter = chapters?.find(
    (chapter) => chapter.chapterOrder === parseInt(chapterOrder)
  );
  const lesson = chapter?.lessons?.find(
    (lesson) => lesson.lessonOrder === parseInt(lessonOrder)
  );

  const renderContent = () => {
    switch (artifact) {
      case "slide":
        return <Slide />;
      case "video":
        return <Video />;
      case "exercise":
        return <Quiz />;
      default:
        return <Slide />;
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleChangeArtifact = (e) => {
    setSelectedKey(e.key);
    switch (e.key) {
      case "1":
        navigate(
          location.pathname.replace(
            location.pathname.substring(location.pathname.lastIndexOf("/")),
            `/slide`
          )
        );
        break;
      case "2":
        navigate(
          location.pathname.replace(
            location.pathname.substring(location.pathname.lastIndexOf("/")),
            `/video`
          )
        );
        break;
      case "3":
        navigate(
          location.pathname.replace(
            location.pathname.substring(location.pathname.lastIndexOf("/")),
            `/exercise`
          )
        );
        break;
      case "4":
        navigate("/study/");
        break;
      default:
        navigate(
          location.pathname.replace(
            location.pathname.substring(location.pathname.lastIndexOf("/")),
            "/slide"
          )
        );
    }
  };

  const handleSubmitComment = (text) => {
    if (text === "") {
      return;
    }
    const newComment = {
      user_id: auth.accountId,
      name: "Mai Van Minh", /// Các thông tin như name, avatar, sẽ được lấy từ db khi gửi về server.
      avatar: "https://randomuser.me/api/portraits/men/78.jpg",
      timestamp: new Date().toLocaleString(),
      content: text,
      likeNums: 2,
      replies: [],
    };
    setComments([newComment, ...comments]); /// Submit comment tới server.
    setText("");
  };

  const handleTextAreaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitComment(text);
    } else {
      setText(e.target.value);
    }
  };

  const handleCollapseButton = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="px-5 my-5">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ background: colorBgContainer, minHeight: "100vh" }}
          width={300}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={(e) => handleChangeArtifact(e)}
            items={[
              {
                key: "1",
                icon: <FilePdfOutlined />,
                label: "Slide bài giảng",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Video bài giảng",
              },
              {
                key: "3",
                icon: <EditOutlined />,
                label: "Bài tập",
              },
              {
                key: "4",
                icon: (
                  <LeftCircleFilled
                    style={{
                      color: "#85A900",
                      fontWeight: "bold",
                      fontSize: "19px",
                    }}
                  />
                ),
                label: (
                  <p className="w-full text-[#85A900] font-semibold text-lg cursor-pointer">
                    Trở về
                  </p>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <p>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={handleCollapseButton}
              style={{
                fontSize: "20px",
                width: 64,
                height: 16,
              }}
            />
            <span className="text-xl font-semibold text-[#FFAB01]">
              Chương {chapter?.chapterOrder}: {chapter?.chapterName} -{" "}
              {lesson?.lessonName}
            </span>
          </p>
          <Content
            style={{
              margin: "16px 16px 0 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
            <div className="px-5 mt-30 w-full">
              <p className="text-left text-lg font-bold text-[#FFAB01] mb-5">
                Bình luận {"(2)"}
              </p>
              <Form>
                <Form.Item>
                  <TextArea
                    placeholder="Bình luận dưới tên Mai Van Minh..."
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleTextAreaKeyDown}
                  />
                </Form.Item>
                <p className="w-full flex flex-row justify-end items-center gap-x-5">
                  <Form.Item>
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "#FFAB01",
                        color: "#FFF",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                      htmlType="submit"
                      onClick={() => {
                        handleSubmitComment(text);
                      }}
                    >
                      Gửi
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="default"
                      style={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "rgba(0, 0, 0, 0.45)",
                      }}
                      onClick={() => setText("")}
                    >
                      Huỷ
                    </Button>
                  </Form.Item>
                </p>
              </Form>
              {comments.map((comment, index) => {
                return <Comment key={index} comment={comment} />;
              })}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Lesson;
