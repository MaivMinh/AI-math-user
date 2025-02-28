import React from "react";

const ChapterCard = ({ chapter, lesson, icon, colour }) => {
  return (
    <div 
      className="w-[250px] h-[160px] rounded-t-2xl rounded-b-2xl p-4 relative shadow-lg overflow-visible"
      style={{ backgroundColor: colour || "#FDBA74" }} // Màu mặc định là cam nhạt
    >
      {/* Tiêu đề chương & bài */}
      <h3 className="text-black font-bold text-lg">
        Chương {chapter} - Bài {lesson}
      </h3>
      <h3 className="text-black">Cộng, trừ các số dưới 10</h3>

      {/* Icon minh họa */}
      <div className="absolute bottom-5 right-5">
        <img
          src={
            icon || "https://cdn-icons-png.flaticon.com/128/4762/4762311.png"
          }
          alt="icon"
          className="w-14 h-14 opacity-80"
        />
      </div>

      {/* Nút học */}
      <div
        className="absolute bottom-[-20px] left-10 w-17 h-17 rounded-full flex items-center justify-center border-4 border-black"
      style={{ backgroundColor: colour || "#FDBA74" }} // Màu mặc định là cam nhạt
      >
        
        <p className="text-black font-bold text-xs">HỌC</p>
      </div>
    </div>
  );
};

export default ChapterCard;
