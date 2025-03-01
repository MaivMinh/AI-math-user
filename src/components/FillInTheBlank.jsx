import React, { useRef, useState } from "react";
import { Input, Carousel, ConfigProvider, message } from "antd";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import fish from "../assets/images/fish.png";
import "react-toastify/dist/ReactToastify.css";

const FillInTheBlank = () => {
  const carouseRef = useRef();

  // Chuyển sang câu tiếp theo.
  const handleNextQuiz = () => {
    carouseRef.current.next();
  };

  const handlePrevQuiz = () => {
    carouseRef.current.prev();
  };

  const arrowStyle = {
    color: "#5405F7", // Màu sắc của mũi tên
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyle, left: 0 }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...arrowStyle, right: 0 }}
        onClick={onClick}
      />
    );
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  return (
    <div className="w-full">
      <ConfigProvider theme={{ components: { Carousel: { arrowSize: 50 } } }}>
        <Carousel
          style={{ width: "100%" }}
          ref={carouseRef}
          arrows
          infinite={false}
          speed={1000}
          draggable
          prevArrow={<PrevArrow />}
          nextArrow={<NextArrow />}
        >
          <div
            className="flex flex-col items-center p-6 bg-blue-50 rounded-lg shadow-md mx-auto w-full h-[450px]"
            style={{ lineHeight: "450px" }}
          >
            {/* Câu hỏi */}
            <h2 className="text-lg font-bold mb-4 text-left w-full">
              Hãy điền số thích hợp vào ô trống
            </h2>

            {/* Hình ảnh */}
            <p className="w-full flex flex-row items-center justify-center space-x-4 my-10 gap-x-10">
              <img
                width={150}
                src={fish}
                alt="Một con cá"
                className="mb-4 rounded-lg shadow"
              />
              <img
                width={150}
                src={fish}
                alt="Một con cá"
                className="mb-4 rounded-lg shadow"
              />
            </p>

            {/* Ô điền và dấu "=" */}
            <p className="w-full flex flex-row items-center justify-center my-10 gap-x-5">
              <Input
                style={{ width: "100px", textAlign: "center" }}
                maxLength={1}
                autoFocus
                value={1}
                disabled
              />
              <span className="text-xl font-bold">+</span>
              <Input
                style={{ width: "100px", textAlign: "center" }}
                maxLength={1}
              />
              <span className="text-xl font-bold">=</span>
              <Input
                style={{ width: "100px", textAlign: "center" }}
                maxLength={1}
                value={2}
                disabled
              />
            </p>
          </div>
          <div className="w-full flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4 text-center w-full mt-10">
              Chọn đáp án đúng bên dưới
            </h2>
            <p className="text-xl font-bold text-center">12 + 10</p>
            <div className="w-4/5 grid grid-cols-2 gap-4 mx-auto mt-20 gap-x-10 gap-y-10">
              {["22", "23", "24", "25"].map((answer) => (
                <button
                  key={answer}
                  className={`${
                    selectedAnswer === answer
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-bold py-4 px-8 rounded-lg w-full text-center text-xl cursor-pointer`}
                  onClick={() => handleAnswerSelect(answer)}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        </Carousel>
        <p className="w-full text-right my-10 flex flex-row justify-between items-center">
          <button
            className="bg-[#B18CFE] text-white px-3 py-1 rounded-lg ml-4 hover:bg-[#b08cfec4] transition-colors duration-300 font-semibold text-lg cursor-pointer"
            onClick={handlePrevQuiz}
          >
            <span className="mr-2">
              <BackwardOutlined />
            </span>
            Quay lại
          </button>

          <button
            className="bg-[#FFAB01] text-white px-3 py-1 rounded-lg ml-4 hover:bg-[#ffaa01ce] transition-colors duration-300 font-semibold text-lg cursor-pointer"
            onClick={handleNextQuiz}
          >
            <span className="mr-2">
              <ForwardOutlined />
            </span>
            Tiếp theo
          </button>
        </p>
      </ConfigProvider>
    </div>
  );
};

export default FillInTheBlank;
