import { Carousel, ConfigProvider } from "antd";
import React, { useEffect } from "react";
import slide_1 from "../assets/images/slide_1.png";
import slide_2 from "../assets/images/slide_2.png";
import { BackwardOutlined, ForwardOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const slides = [slide_1, slide_2];

const arrowStyle = {
  color: "#5405F7", // Màu sắc của mũi tên
};

const Slide = ({ props }) => {
  const carouseRef = React.useRef();
  const { chapterOrder, lessonOrder } = useParams();

  useEffect(() => {}, [chapterOrder, lessonOrder]);

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

  const carouselStyle = {
    margin: 0,
    height: "450px",
    lineHeight: "450px",
    textAlign: "center",
  };

  return (
    <div className={`w-full h-[450px] relative`}>
      <div className="w-full h-full">
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
            style={{ width: "100%", height: `450px` }}
          >
            {slides.map((slide, index) => (
              <div key={index}>
                <h3 style={carouselStyle}>
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </h3>
              </div>
            ))}
          </Carousel>
        </ConfigProvider>
        <p className={`w-full text-right mt-5 flex flex-row justify-between items-center absolute -bottom-16 right-0`}>
          <button
            className="bg-[#B18CFE] text-white px-3 py-1 rounded-lg ml-4 hover:bg-[#b08cfec4] transition-colors duration-300 font-semibold text-lg cursor-pointer"
            onClick={handlePrevQuiz}
          >
            <span className="mr-2">
              <BackwardOutlined />
            </span>
            Trang trước
          </button>

          <button
            className="bg-[#FFAB01] text-white px-3 py-1 rounded-lg ml-4 hover:bg-[#ffaa01ce] transition-colors duration-300 font-semibold text-lg cursor-pointer"
            onClick={handleNextQuiz}
          >
            <span className="mr-2">
              <ForwardOutlined />
            </span>
            Trang sau
          </button>
        </p>
      </div>
    </div>
  );
};

export default Slide;
