import React from "react";
import Comment from "../components/Comment.jsx";

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

const Video = ({ url, ...props }) => {
  const [comments, setComments] = React.useState(commentItems);

  if (url === null || url === undefined) {
    url = "https://www.youtube.com/embed/aD6VC8PnOWA"; /// default video.
  }

  const isYouTubeUrl = url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <div className="w-full">
      {isYouTubeUrl ? (
        <iframe
          width="100%"
          height="450"
          src={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded YouTube Video"
        ></iframe>
      ) : (
        <video width="100%" height="auto" controls>
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Video;
