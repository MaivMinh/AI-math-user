import React, { useContext, useEffect, useState } from "react";
import MultipleChoice from "./MultipleChoice.jsx";
import base from "../services/base.js";
import { AppContext } from "../context/AppContext.jsx";
import { BackwardOutlined, ForwardOutlined, QuestionCircleFilled } from "@ant-design/icons";
import { Button, Carousel, ConfigProvider } from "antd";
import { useRef } from "react";
import CalculateResult from "./CalculateResult.jsx";

const Quiz = ({ chapter, lesson, height, props }) => {
  const [questions, setQuestions] = useState([]);
  const { grade } = useContext(AppContext);
  const [answers, setAnswers] = useState([]); /// Danh sách câu trả lời của người dùng
  

  useEffect(() => {
    const fetchQuizzes = async () => {
      const response = await base.get(
        `/api/Question/GetQuestionByGradeAndId/grade/1/lessionOrder/1`
      );
      const data = response.data;
      console.log(data);
      setQuestions(data);
    };
    fetchQuizzes();
  }, []);

  const carouseRef = useRef();

  // Chuyển sang câu tiếp theo.
  const handleNextQuiz = () => {
    carouseRef.current.next();
  };

  const handlePrevQuiz = () => {
    carouseRef.current.prev();
  };

  const handleGoBackQuestion = (index) => {
    carouseRef.current.goTo(index);
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

  const saveAnswer = (answer) => {
    /// Hàm thục hiện loại bỏ đi câu trả lời trước đó và thêm câu trả lời mới vào danh sách câu trả lời
    setAnswers((prev) => {
      const newAnswers = prev.filter(
        (item) => item.questionId !== answer.questionId
      );
      newAnswers.push(answer);
      return newAnswers;
    });
  };

  const handleCheckingResult = () => {
    /// Hàm thực hiện xem kết quả của bài làm
    carouseRef.current.goTo(questions.length);
  };

  return (
    <div className="w-full h-full relative">
      <Button
        style={{
          position: "absolute",
          top: "0",
          right: "10px",
          zIndex: "100",
          fontWeight: "500",
        }}
        variant="filled"
        color="purple"
        onClick={handleCheckingResult}
        icon={<QuestionCircleFilled />}
      >
        Kiểm tra kết quả
      </Button>
      {questions.length > 0 && (
        <ConfigProvider theme={{ components: { Carousel: { arrowSize: 50 } } }}>
          <Carousel
            style={{ width: "100%", height: height }}
            ref={carouseRef}
            infinite={false}
            speed={1000}
            draggable
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            dots={false}
          >
            {questions.map((question, index) => {
              return question.questionType === "multiple_choice" ? (
                <MultipleChoice
                  key={index}
                  question={question}
                  onClick={saveAnswer}
                />
              ) : null;
            })}
            <CalculateResult
              questions={questions}
              answers={answers}
              height={height}
              handleGoBackQuestion={handleGoBackQuestion}
            />
          </Carousel>
        </ConfigProvider>
      )}
      <p className="w-full text-right my-5 flex flex-row justify-between items-center">
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
    </div>
  );
};

export default Quiz;
