import React, { useEffect, useState } from "react";
import {
  LikeFilled,
  LikeOutlined,
  MessageFilled,
  MessageOutlined,
} from "@ant-design/icons";

const Comment = ({ comment, props }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeNums, setLikeNums] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setLikeNums(comment.likeNums);
  }, [comment.likeNums]); /// Có comment.likeNums làm thay đổi vì có thể ai đó click vào like khiến component re-render.

  const handleLikeButtonClick = (comment) => {
    if (isLiked) {
      setIsLiked(false);
      setLikeNums(likeNums - 1);
    } else {
      setIsLiked(true);
      setLikeNums(likeNums + 1);
    }
  };

  const handleCommentButtonClick = (comment) => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  return (
    <div className="w-full mb-5">
      <div className="w-full min-h-20 bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-row gap-x-5 items-center justify-start">
          <img
            src={comment.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <p>
            <h2 className="text-md text-[#85A900]">{comment.name}</h2>
            <span className="text-sm text-gray-400">{comment.timestamp}</span>
          </p>
        </div>
        <p className="text-sm text-gray-600 mt-2">{comment.content}</p>

        <div className="flex justify-start items-center mt-4 text-gray-500">
          <p className="flex items-center min-w-10">
            <button
              className="cursor-pointer"
              onClick={() => {
                handleLikeButtonClick(comment);
              }}
            >
              {isLiked ? (
                <LikeFilled style={{ color: "#85A900" }} />
              ) : (
                <LikeOutlined style={{ color: "#85A900" }} />
              )}
            </button>
            <span className="text-sm text-gray-600 ml-2">{likeNums}</span>
          </p>
          <div className="w-[2px] h-3/5 min-h-[16px] bg-gray-500 mx-5"></div>
          <p>
            <button
              className="cursor-pointer"
              onClick={() => {
                handleCommentButtonClick(comment);
              }}
            >
              {isClicked ? (
                <MessageFilled style={{ color: "#85A900" }} />
              ) : (
                <MessageOutlined style={{ color: "#85A900" }} />
              )}
            </button>
            <span className="text-sm text-gray-600 ml-2">
              {comment.replies ? comment.replies.length : 0}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comment;
