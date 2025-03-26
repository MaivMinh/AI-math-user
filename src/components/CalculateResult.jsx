import React, { useState } from "react";
import { Button, Card, Divider, Badge, Progress, Modal } from "antd";
import {
  CheckCircleFilled,
  EyeFilled,
  TrophyOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import ReactConfetti from "react-confetti";

const CalculateResult = ({
  questions,
  answers,
  height,
  handleGoBackQuestion,
}) => {
  const [score, setScore] = useState(0);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [examination, setExamination] = useState(false);

  const calculateScore = () => {
    const correctAnswers = answers.filter(
      (answer) => answer.answer.isCorrect
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(percentage);
    setResultsVisible(true);
    setExamination(true);
  };

  const getLetterFromIndex = (index) => {
    return String.fromCharCode(65 + index);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#1890ff";
    if (score >= 40) return "#faad14";
    return "#f5222d";
  };

  const reviewResult = () => {
    setResultsVisible(false);
    setExamination(true);
  };

  const reExamination = () => {
    setResultsVisible(false);
    setExamination(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto" style={{ height: height }}>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">
        Bài làm của bạn
      </h2>
      <div className="space-y-6 overflow-y-scroll" style={{ height: "90%" }}>
        {questions.map((question, index) => {
          {
            /* answer này có thể = null khi học sinh không chọn kết quả cho câu hỏi này. */
          }
          const answer = answers.find(
            (answer) => answer.questionId === question.questionId
          );
          const isContain = answer === undefined ? false : true;
          return (
            <Card
              key={index}
              title={
                <p className="flex flex-row items-center justify-between w-full h-full">
                  <p
                    className={`text-gray-600 font-semibold ${
                      !isContain && "text-red-600"
                    }`}
                  >
                    <span>Câu hỏi {index + 1}: </span>
                    <span>{question.questionContent}</span>
                  </p>
                  <p>
                    <Button
                      color="danger"
                      variant="filled"
                      onClick={() => handleGoBackQuestion(index)}
                    >
                      Quay lại
                    </Button>
                  </p>
                </p>
              }
              style={{ marginBottom: 20, padding: 10 }}
            >
              <div className="space-y-4">
                {question.questionType === "multiple_choice" && (
                  <div>
                    {/* In ra danh sách các câu trả lời của câu hỏi hiện tại.
                     */}
                    {question.choiceAnswers.map((choice, index) => {
                      return (
                        <>
                          {examination ? (
                            <div>
                              {choice.isCorrect ? (
                                <div
                                  key={index}
                                  className="bg-[#52c41a] text-[#F5F5F5] p-1 rounded-md"
                                >
                                  <p className="py-2 pl-2">
                                    <span className="font-bold text-md">
                                      {getLetterFromIndex(index)}.{" "}
                                    </span>
                                    <span className="text-md font-semibold">
                                      {choice.content}
                                    </span>
                                  </p>
                                </div>
                              ) : (
                                <div key={index} className={"p-1 rounded-md"}>
                                  <p className="py-2 pl-2">
                                    <span className="font-bold text-md">
                                      {getLetterFromIndex(index)}.{" "}
                                    </span>
                                    <span className="text-md font-semibold">
                                      {choice.content}
                                    </span>
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div
                              key={index}
                              className={`${
                                answer?.answer?.answerId === choice.answerId
                                  ? "bg-[#FFAB01] text-[#F5F5F5]"
                                  : ""
                              } p-1 rounded-md`}
                            >
                              <p className="py-2 pl-2">
                                <span className="font-bold text-md">
                                  {getLetterFromIndex(index)}.{" "}
                                </span>
                                <span className="text-md font-semibold">
                                  {choice.content}
                                </span>
                              </p>
                            </div>
                          )}
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
        <p className="w-full flex flex-row justify-end items-center mt-5 pb-10">
          <Button
            color="green"
            variant="filled"
            onClick={calculateScore}
            icon={<CheckCircleFilled />}
            style={{
              marginRight: 30,
              fontWeight: "500",
            }}
          >
            Chấm điểm
          </Button>
        </p>
      </div>
      <Modal
        title={
          <div className="flex items-center">
            <TrophyOutlined className="text-yellow-500 text-2xl mr-2" />
            <span>Kết quả của bạn</span>
          </div>
        }
        open={resultsVisible}
        onCancel={() => reviewResult()}
        footer={[
          <div className="w-[95%] mx-auto flex flex-row justify-between items-center gap-x-5">
            <Button
              variant="filled"
              color="purple"
              style={{ fontWeight: "500" }}
              key="close"
              icon=<UndoOutlined spin />
              onClick={() => reExamination()}
            >
              Thực hiện lại
            </Button>
            <Button
              style={{ fontWeight: "500" }}
              variant="filled"
              color="green"
              key="close"
              onClick={() => reviewResult()}
              icon=<EyeFilled />
            >
              Xem đáp án
            </Button>
          </div>,
        ]}
        centered
      >
        <div className="py-6 flex flex-row items-center justify-center gap-x-10">
          {score === 100 && (
            <ReactConfetti
              width={500}
              height={300}
              recycle={true}
              numberOfPieces={300}
              drawShape={(ctx) => {
                ctx.beginPath();
                for (let i = 0; i < 22; i++) {
                  const angle = 0.35 * i;
                  const x = (0.2 + 1.5 * angle) * Math.cos(angle);
                  const y = (0.2 + 1.5 * angle) * Math.sin(angle);
                  ctx.lineTo(x, y);
                }
                ctx.stroke();
                ctx.closePath();
              }}
            />
          )}
          <Progress
            type="circle"
            percent={score}
            strokeColor={getScoreColor(score)}
            className="mb-4"
            size={"small"}
          />
          <p className="">
            <h3 className="text-center mt-4 text-xl font-medium">
              {score >= 80 && "Tuyệt vời!"}
              {score >= 60 && score < 80 && "Khá tốt!"}
              {score >= 40 && score < 60 && "Cần cố gắng thêm!"}
              {score < 40 && "Hãy ôn tập lại!"}
            </h3>
            <p className="text-center text-gray-500">
              Bạn đã trả lời đúng{" "}
              {answers.filter((answer) => answer.answer.isCorrect).length}/
              {answers.length} câu hỏi
            </p>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CalculateResult;
