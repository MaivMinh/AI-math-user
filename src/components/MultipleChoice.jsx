import React, { useRef, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const MultipleChoice = ({ question, onClick, props }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    onClick({
      questionId: question?.questionId,
      answer: answer,
    });
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-left w-full mt-2 text-[#FFAB01]">
          Chọn đáp án đúng bên dưới
        </h2>
        <p className="text-xl font-bold text-center">
          {question?.questionContent} ?
        </p>
        <p className="text-center mt-4 mx-auto flex flex-row items-center justify-center">
          {question?.imgUrl && (
            <img
              src={question?.imgUrl}
              alt="question"
              className="w-1/2 max-h-[300px] object-cover"
            />
          )}
        </p>
        <div className="w-4/5 grid grid-cols-2 gap-4 mx-auto mt-10 gap-x-10 gap-y-10">
          {question?.choiceAnswers?.map((answer, index) => (
            <button
              key={index}
              className={`${
                selectedAnswer?.answerId === answer?.answerId
                  ? "bg-[#FFAB01] hover:bg-[#ffaa01d8]"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-lg w-full text-center text-xl cursor-pointer flex flex-row items-center justify-center gap-x-3`}
              onClick={() => handleAnswerSelect(answer)}
            >
              {answer?.imgUrl && (
                <img
                  src={answer.imgUrl}
                  alt="answer"
                  className="max-h-[60px] object-cover rounded-md"
                />
              )}
              <span>{answer?.content}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoice;
