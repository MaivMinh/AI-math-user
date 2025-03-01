import { Button, Form, Space, Tooltip } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import chapter_1 from "../assets/images/chapter_1.png";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import Comment from "../components/Comment.jsx";

const items = [
  {
    grade: 1,
    chapterOrder: 1,
    chapterName: "Làm quen với một số hình",
    lessons: [
      {
        lessonOrder: 1,
        lessonName: "Vị trí",
        isComplete: true,
      },
      {
        lessonOrder: 2,
        lessonName: "Khối hộp chữ nhật - Khối lập phương",
        isComplete: true,
      },
      {
        lessonOrder: 3,
        lessonName: "Hình tròn - Hình tam giác - Hình vuông - Hình chữ nhật",
        isComplete: true,
      },
      {
        lessonOrder: 4,
        lessonName: "Xếp hình",
        isComplete: true,
      },
      {
        lessonOrder: 5,
        lessonName: "Thực hành và trải nghiệm: Vui Trung thu",
        isComplete: true,
      },
    ],
  },
  {
    grade: 1,
    chapterOrder: 2,
    chapterName: "Các số đến 10",
    lessons: [
      {
        lessonOrder: 1,
        lessonName: "Các số 1, 2, 3",
        isComplete: true,
      },
      {
        lessonOrder: 2,
        lessonName: "Các số 4, 5",
        isComplete: true,
      },
      {
        lessonOrder: 3,
        lessonName: "Tách - Gộp số",
        isComplete: true,
      },
      {
        lessonOrder: 4,
        lessonName: "Bằng nhau, nhiều hơn, ít hơn",
        isComplete: false,
      },
      {
        lessonOrder: 5,
        lessonName: "So sánh các số: bằng, lớn hơn, bé hơn",
        isComplete: false,
      },
      {
        lessonOrder: 6,
        lessonName: "Các dấu =, >, <",
        isComplete: false,
      },
    ],
  },
  {
    grade: 1,
    chapterOrder: 3,
    chapterName: "Phép cộng, phép trừ trong phạm vi 10",
    lessons: [
      {
        lessonOrder: 1,
        lessonName: "Phép cộng",
        isComplete: false,
      },
      {
        lessonOrder: 2,
        lessonName: "Phép cộng trong phạm vi 10",
        isComplete: false,
      },
      {
        lessonOrder: 3,
        lessonName: "Cộng bằng cách đếm thêm",
        isComplete: false,
      },
      {
        lessonOrder: 4,
        lessonName: "Phép trừ",
        isComplete: true,
      },
      {
        lessonOrder: 5,
        lessonName: "Phép trừ trong phạm vi 10",
        isComplete: true,
      },
      {
        lessonOrder: 6,
        lessonName: "Trừ bằng cách đếm bớt",
        isComplete: true,
      },
      {
        lessonOrder: 7,
        lessonName: "Em làm được những gì?",
        isComplete: true,
      },
      {
        lessonOrder: 8,
        lessonName: "Ôn tập học kỳ 1",
        isComplete: true,
      },
      {
        lessonOrder: 9,
        lessonName: "Thực hành và trải nghiệm: Em đi bộ theo luật giao thông",
        isComplete: true,
      },
    ],
  },
  {
    grade: 1,
    chapterOrder: 4,
    chapterName: "Các số đến 20",
    lessons: [
      {
        lessonOrder: 1,
        lessonName: "Các số đến 20",
        isComplete: false,
      },
      {
        lessonOrder: 2,
        lessonName: "Các phép tính dạng 10 + 4, 14 - 4",
        isComplete: false,
      },
      {
        lessonOrder: 3,
        lessonName: "Các phép tính dạng 12 + 3, 15 - 3",
        isComplete: false,
      },
      {
        lessonOrder: 4,
        lessonName: "Chiếc đồng hồ của em",
        isComplete: false,
      },
      {
        lessonOrder: 5,
        lessonName: "Em làm được những gì?",
        isComplete: false,
      },
    ],
  },
  {
    grade: 1,
    chapterOrder: 5,
    chapterName: "Các số đến 100",
    lessons: [
      {
        lessonOrder: 1,
        lessonName: "Chục - Số tròn chục",
        isComplete: false,
      },
      {
        lessonOrder: 2,
        lessonName: "Các phép tính dạng 30 + 20, 50 - 20",
        isComplete: false,
      },
      {
        lessonOrder: 3,
        lessonName: "Chục - Đơn vị",
        isComplete: false,
      },
      {
        lessonOrder: 4,
        lessonName: "Các số đến 40",
        isComplete: false,
      },
      {
        lessonOrder: 5,
        lessonName: "So sánh các số",
        isComplete: false,
      },
      {
        lessonOrder: 6,
        lessonName: "Các số đến 100",
        isComplete: false,
      },
      {
        lessonOrder: 7,
        lessonName: "Bảng các số từ 1 đến 100",
        isComplete: false,
      },
      {
        lessonOrder: 8,
        lessonName: "Các phép tính dạng 34 + 23, 57 - 23",
        isComplete: false,
      },
      {
        lessonOrder: 9,
        lessonName: "Em làm được những gì?",
        isComplete: false,
      },
      {
        lessonOrder: 10,
        lessonName: "Các ngày trong tuần",
        isComplete: false,
      },
      {
        lessonOrder: 11,
        lessonName: "Tờ lịch của em",
        isComplete: false,
      },
      {
        lessonOrder: 12,
        lessonName: "Thực hành và trải nghiệm: Em và các bạn",
        isComplete: false,
      },
      {
        lessonOrder: 13,
        lessonName: "Độ dài",
        isComplete: false,
      },
      {
        lessonOrder: 14,
        lessonName: "Đo độ dài",
        isComplete: false,
      },
      {
        lessonOrder: 15,
        lessonName: "Xăng-ti-mét. Đơn vị đo độ dài",
        isComplete: false,
      },
      {
        lessonOrder: 16,
        lessonName: "Em làm được những gì?",
        isComplete: false,
      },
      {
        lessonOrder: 17,
        lessonName: "Ôn tập cuối năm",
        isComplete: false,
      },
      {
        lessonOrder: 18,
        lessonName: "Thực hành và trải nghiệm: Ong và hoa",
        isComplete: false,
      },
      {
        lessonOrder: 19,
        lessonName: "Bảng từ ngữ.",
        isComplete: false,
      },
    ],
  },
];

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

const Lesson = () => {
  const [data, setData] = React.useState(null);
  const [seletedChapter, setSelectedChapter] = React.useState();
  const { currentLesson } = useContext(AppContext);
  const [comments, setComments] = React.useState(commentItems);
  const content = useRef(null);
  const [text, setText] = React.useState("");
  const { accountId } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = {
          data: items,
        };
        setData(response.data);
        if (currentLesson?.chapterOrder !== null) {
          setSelectedChapter({
            chapterOrder: currentLesson.chapterOrder,
            chapterName: currentLesson.chapterName,
          });
          content.current = response.data.find(
            (item) => item.chapterOrder === parseInt(currentLesson.chapterOrder)
          );
        } else {
          setSelectedChapter(response.data[0].chapterOrder); /// Vị trí ban đầu.
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChapter = (chapter) => {
    /// Cập nhật lại chapter hiện tại.
    /// Fetch dữ liệu và re-render lại page.
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
      user_id: accountId,
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
      <div className="col-span-1 items-center justify-start gap-y-4 px-4 overflow-x-hidden h-screen whitespace-nowrap overflow-y-hidden sticky">
        {data?.map((chapter, index) => {
          return (
            <button
              className={
                chapter.chapterOrder === seletedChapter.chapterOrder
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
                <span className="text-nowrap">{chapter.chapterName}</span>
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
      <div className="col-span-3 whitespace-nowrap overflow-y-scroll overflow-x-hidden min-h-screen">
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
                        lesson.isComplete ? studiedStyle : unstudiedStyle
                      }
                    >{`Bài ${lesson.lessonOrder}: ${lesson.lessonName}`}</p>
                  </p>
                </p>
                <p className="col-span-3 flex flex-row justify-end items-center gap-x-10">
                  <Link to={`${lesson.lessonOrder}/slide`}>
                    <span className="underline text-blue-500">Slide</span>
                  </Link>
                  <Link to={`${lesson.lessonOrder}/video`}>
                    <span className="underline text-blue-500">Video</span>
                  </Link>
                  <Link to={`${lesson.lessonOrder}/bai-tap`}>
                    <span className="underline text-blue-500">Bài tập</span>
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
    </div>
  );
};

export default Lesson;
