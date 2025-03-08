import React, { useContext, useEffect, useState } from "react";
import MultipleChoice from "./MultipleChoice.jsx";
import base from "../services/base.js";
import { AppContext } from "../context/AppContext.jsx";
import FillInTheBlank from "./FillInTheBlank.jsx";
import DragAndDrop from "./DragAndDrop.jsx";
import TrueOrFalse from "./TrueOrFalse.jsx";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { Carousel, ConfigProvider } from "antd";
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

  return (
    <div>
      {questions.length > 0 && (
        <ConfigProvider theme={{ components: { Carousel: { arrowSize: 50 } } }}>
          <Carousel
            style={{ width: "100%", height: height }}
            ref={carouseRef}
            arrows
            infinite={false}
            speed={1000}
            draggable
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
          >
            {questions.map((question, index) => {
              return question.questionType === "multiple_choice" ? (
                <MultipleChoice
                  key={index}
                  question={question}
                  onClick={saveAnswer}
                />
              ) : question.questionType === "fill_in_the_blank" ? (
                <FillInTheBlank key={index} question={question} />
              ) : question.questionType === "drag_and_drop" ? (
                <DragAndDrop key={index} question={question} />
              ) : question.questionType === "true_or_false" ? (
                <TrueOrFalse key={index} question={question} />
              ) : null;
            })}
            <div>
              <CalculateResult questions={questions} answers={answers} />
            </div>
          </Carousel>
        </ConfigProvider>
      )}
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
    </div>
  );
};

export default Quiz;
