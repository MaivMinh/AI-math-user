import { Button, Form, Skeleton, Space, Tooltip } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import chapter_1 from "../assets/images/chapter_1.png";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Comment from "../components/Comment.jsx";
import apiClient from "../services/apiClient.js";
import { TitleContext } from "../context/TitleContext.jsx";

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

const currentChapter = {
  studiedLesson: 3,
  allLesson: 5,
};

const Study = () => {
  const [comments, setComments] = React.useState(commentItems);
  const content = useRef(null);
  const [text, setText] = React.useState("");
  const { auth } = useContext(AuthContext);
  const [seletedChapter, setSelectedChapter] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chapters, setChapters] = useState([]);
  const { titles, setTitles } = useContext(TitleContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      const fetchData = async () => {
        if (titles.length > 0) {
          setChapters(titles);
          setSelectedChapter(titles[0]);
          content.current = titles[0];
          setLoading(false);
          setError(false);
          return;
        }
        try {
          const response = await apiClient.get(
            `/api/chapters/grade/${auth.grade}/details`
          );
          const data = response.data;
          setTitles(data);
          setChapters(data);
          setSelectedChapter(data[0]);
          content.current = data[0];
          setLoading(false);
          setError(false);
        } catch (error) {
          console.log(error);
          setError(true);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [auth]);

  const handleSelectChapter = (chapter) => {
    setSelectedChapter({
      chapterOrder: chapter.chapterOrder,
      chapterName: chapter.chapterName,
    });
    content.current = chapter;
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

  const selectedStyle =
    "cursor-pointer w-full h-20 px-3 bg-[#B18CFE] hover:bg-[#b08cfecd] text-wrap flex flex-row justify-start items-center gap-x-2 font-bold text-lg text-[#F6F6F6] mb-5 rounded-2xl duration-500";
  const unselectedStyle =
    "cursor-pointer w-full h-20 px-3 bg-[#85A900] hover:bg-[#84a900cd] text-wrap flex flex-row justify-start items-center gap-x-2 font-bold text-lg text-[#F6F6F6] mb-5 rounded-2xl duration-500";

  const studiedStyle = "text-gray-500";
  const unstudiedStyle = "text-black";

  return (
    <div className="px-5 min-h-screen w-full grid grid-cols-4 relative">
      {error && (
        <div className="flex flex-col items-center justify-center col-span-4 h-[70vh] p-6 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Không có dữ liệu
          </h3>
          <p className="text-gray-500 text-center max-w-xs">
            Không tìm thấy nội dung bài học. Vui lòng thử lại sau hoặc liên hệ
            hỗ trợ.
          </p>
          <button
            className="mt-6 px-4 py-2 bg-[#B18CFE] hover:bg-[#a070fe] text-white font-medium rounded-lg transition-colors duration-300 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            Làm mới trang
          </button>
        </div>
      )}
      <div className="col-span-1 items-center justify-start gap-y-4 px-4 overflow-x-hidden h-screen whitespace-nowrap overflow-y-hidden sticky">
        {loading ? (
          <Skeleton
            active
            loading={loading}
            paragraph={{
              rows: 10,
            }}
          />
        ) : (
          <div className="w-ful h-full">
            {chapters?.length > 0 && (
              <div className="w-full">
                {chapters?.map((chapter, index) => {
                  return (
                    <button
                      className={
                        seletedChapter !== null &&
                        chapter.chapterOrder === seletedChapter?.chapterOrder
                          ? selectedStyle
                          : unselectedStyle
                      }
                      onClick={() => handleSelectChapter(chapter)}
                      key={chapter.chapterOrder}
                    >
                      <span className="text-nowrap">
                        Chapter {chapter.chapterOrder}:{" "}
                      </span>
                      {chapter.chapterName.length <= 20 ? (
                        <span className="text-nowrap">
                          {chapter.chapterName}
                        </span>
                      ) : (
                        <Tooltip
                          title={chapter.chapterName}
                          arrow={true}
                          placement="bottomRight"
                          color="#B18CFE"
                          mouseEnterDelay={1}
                        >
                          <span className="text-nowrap">
                            {chapter.chapterName.substring(0, 20)} ...
                          </span>
                        </Tooltip>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="col-span-3 whitespace-nowrap overflow-y-scroll overflow-x-hidden min-h-screen">
        {loading ? (
          <Skeleton
            active
            loading={loading}
            paragraph={{
              rows: 10,
            }}
          />
        ) : (
          <div className="w-full h-full">
            {chapters?.length > 0 && (
              <div className="w-full h-full">
                <div className="px-5 grid grid-cols-10 gap-x-5 mb-5">
                  <div className="col-span-7 bg-[#FFAB01] rounded-xl px-10 py-2 flex flex-row justify-between items-start">
                    <p className="font-bold text-xl text-white">{`Chương ${seletedChapter?.chapterOrder}: ${seletedChapter?.chapterName}`}</p>
                    <img src={chapter_1} className="object-cover max-h-24" />
                  </div>
                  <div className="col-span-3 grid grid-cols-2 bg-[#FFAB01] rounded-xl px-5 py-2 h-full">
                    <div className="col-span-1 flex flex-col items-start justify-between h-full">
                      <p className="text-white font-bold">Đã hoàn thành</p>
                      <Button type="primary">Học tiếp</Button>
                    </div>
                    <div className="col-span-1 flex flex-col items-center justify-between h-full">
                      <div className="w-24 h-24">
                        <CircularProgressbarWithChildren
                          value={
                            (currentChapter?.studiedLesson /
                              currentChapter?.allLesson) *
                            100
                          }
                          styles={buildStyles({
                            pathColor: `rgba(255, 187, 123, 100)`,
                            trailColor: "#000",
                            textColor: "#f88",
                            backgroundColor: "#3e98c7",
                            textSize: "16px",
                          })}
                          strokeWidth={10}
                        >
                          <p className="font-bold flex flex-col items-center justify-center text-[#F5F5F5]">
                            <span>
                              {currentChapter?.studiedLesson} /{" "}
                              {currentChapter?.allLesson}
                            </span>
                            <span>bài học</span>
                          </p>
                        </CircularProgressbarWithChildren>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-5 border-[1px] border-gray-300 rounded-xl max-h-[400px] whitespace-nowrap overflow-y-scroll">
                  {content.current?.lessons.map((lesson, index) => {
                    return (
                      <p
                        key={lesson.lessonOrder}
                        className="px-5 w-full grid grid-cols-10 mb-5 mt-5"
                      >
                        <p className="col-span-7 flex flex-row gap-x-8 justify-start items-center">
                          <span>
                            {index + 1 < 10 ? `0${index + 1}` : `${index + 1}`}
                          </span>
                          <p className="flex flex-row items-center gap-x-2 justify-start">
                            <p
                              className={
                                lesson.isComplete
                                  ? studiedStyle
                                  : unstudiedStyle
                              }
                            >{`Bài ${lesson.lessonOrder}: ${lesson.lessonName}`}</p>
                          </p>
                        </p>
                        <p className="col-span-3 flex flex-row justify-end items-center gap-x-10">
                          <Link
                            to={`chapters/${content.current.chapterOrder}/lessons/${lesson.lessonOrder}/slide?`}
                          >
                            <span className="underline text-blue-500">
                              Slide
                            </span>
                          </Link>
                          <Link
                            to={`chapters/${content.current.chapterOrder}/lessons/${lesson.lessonOrder}/video?`}
                          >
                            <span className="underline text-blue-500">
                              Video
                            </span>
                          </Link>
                          <Link
                            to={`chapters/${content.current.chapterOrder}/lessons/${lesson.lessonOrder}/exercise?`}
                          >
                            <span className="underline text-blue-500">
                              Bài tập
                            </span>
                          </Link>
                        </p>
                      </p>
                    );
                  })}
                </div>
                <div className="px-5 mt-10 w-full">
                  <p className="text-left text-lg font-bold text-[#FFAB01] mb-5">
                    Bình luận {"(15)"}
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

                  <div className="w-full mt-10">
                    {comments.map((comment, index) => {
                      return <Comment key={index} comment={comment} />;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Study;
