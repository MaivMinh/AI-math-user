import React from "react";
import FillInTheBlank from "./FillInTheBlank";

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

const Quiz = () => {
  return (
    <div>
      <FillInTheBlank />
    </div>
  );
};

export default Quiz;
