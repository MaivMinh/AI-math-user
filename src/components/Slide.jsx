import { Carousel, ConfigProvider } from "antd";
import React from "react";
import slide_1 from "../assets/images/slide_1.png";
import slide_2 from "../assets/images/slide_2.png";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";

const slides = [slide_1, slide_2];

const Slide = ({}) => {
  const carouseRef = React.useRef();
  const carouselStyle = {
    margin: 0,
    height: "450px",
    lineHeight: "450px",
    textAlign: "center",
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

  const handleNextQuiz = () => {
    carouseRef.current.next();
  };
  const handlePrevQuiz = () => {
    carouseRef.current.prev();
  };

  return (
    <div className="w-full">
      <div>
        <ConfigProvider
          theme={{
            components: {
              Carousel: {
                arrowSize: 50,
              },
            },
          }}
        >
          <Carousel
            ref={carouseRef}
            arrows
            infinite={false}
            speed={1000}
            draggable
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            style={{}}
          >
            {slides.map((slide, index) => (
              <div key={index}>
                <h3 style={carouselStyle}>
                  <img src={slide} alt={`Slide ${index + 1}`} />
                </h3>
              </div>
            ))}
          </Carousel>
        </ConfigProvider>
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
        ˝
      </div>
    </div>
  );
};

export default Slide;
