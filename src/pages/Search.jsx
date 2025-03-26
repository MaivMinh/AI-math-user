import React, { useState, useEffect } from "react";
import { Input, Card, Empty, Spin, Badge, Tag } from "antd";
import {
  SearchOutlined,
  YoutubeOutlined,
  BookOutlined,
  RightOutlined,
  ContainerOutlined,
  QuestionCircleFilled,
  BookFilled,
  PaperClipOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get search term from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("v");
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [location.search]);

  const performSearch = async (term) => {
    if (!term) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get(
        `/api/lesson/grade/1/lessonname/${term}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Search failed:", error);
      // For demo, use sample data
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Update URL to reflect search
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set("v", value);
    } else {
      searchParams.delete("v");
    }
    navigate({ search: searchParams.toString() });
    performSearch(value);
  };

  const navigateToLesson = (lessonOrder) => {
    navigate(`/study/chapters/1/lessons/${lessonOrder}/`);
  };

  const isYoutubeLink = (url) =>
    (url && url.includes("youtube.com")) || url.includes("youtu.be");

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-purple-800 mb-2">
            Tìm kiếm bài học
          </h1>
          <p className="text-gray-600">
            Khám phá các bài học toán học phù hợp với nhu cầu của bạn
          </p>
        </div>

        <Input
          size="large"
          placeholder="Nhập từ khóa tìm kiếm... (ví dụ: cộng, trừ, hình học)"
          prefix={<SearchOutlined className="text-purple-500" />}
          value={searchTerm}
          onChange={handleSearch}
          className="rounded-lg shadow-md mb-8"
          allowClear
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" tip="Đang tìm kiếm..." />
          </div>
        ) : (
          <>
            {searchTerm && (
              <p className="text-gray-600 mb-4">
                Kết quả tìm kiếm cho "{searchTerm}":{" "}
                <span className="font-semibold">{results.length}</span> bài học
              </p>
            )}

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((lesson) => (
                  <Card
                    key={lesson.lessonOrder}
                    hoverable
                    className="overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-purple-100 rounded-xl"
                    onClick={() => navigateToLesson(lesson.lessonOrder)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <div className="flex justify-between items-start">
                          {lesson.questions && lesson.questions.length > 0 && (
                            <Badge
                              count={lesson.questions.length}
                              showZero
                              color="#52c41a"
                              overflowCount={99}
                            >
                              <Tag color="green">Câu hỏi</Tag>
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-purple-900 mt-2">
                          Bài học {lesson.lessonOrder}: {lesson.lessonName}
                        </h3>
                      </div>

                      <div className="mt-3 flex flex-nowrap gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/study/chapters/1/lessons/${lesson.lessonOrder}/video`
                            );
                          }}
                          className="group relative px-2 py-1 cursor-pointer rounded-md border-2 border-red-500 text-red-500 font-medium transition-all duration-300 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                        >
                          <span className="relative z-10 flex items-center">
                            <YoutubeOutlined className="mr-1" /> Video
                          </span>
                          <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-200/30 blur-md"></span>
                          <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-red-500/20 to-red-400/20 blur"></span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/study/chapters/1/lessons/${lesson.lessonOrder}/slide`
                            );
                          }}
                          className="group relative px-2 py-1 cursor-pointer rounded-md border-2 border-blue-500 text-blue-500 font-medium transition-all duration-300 hover:bg-blue-50 hover:text-blue-600 focus:outline-none"
                        >
                          <span className="relative z-10 flex items-center">
                            <PaperClipOutlined className="mr-1" /> Slide
                          </span>
                          <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-blue-200/30 blur-md"></span>
                          <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 to-blue-400/20 blur"></span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(
                              `/study/chapters/1/lessons/${lesson.lessonOrder}/quiz`
                            );
                          }}
                          className="group relative px-2 py-1 cursor-pointer rounded-md border-2 border-green-500 text-green-500 font-medium transition-all duration-300 hover:bg-green-50 hover:text-green-600 focus:outline-none"
                        >
                          <span className="relative z-10 flex items-center">
                            <QuestionCircleFilled className="mr-1" /> Bài tập
                          </span>
                          <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-green-200/30 blur-md"></span>
                          <span className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 bg-gradient-to-r from-green-500/20 to-green-400/20 blur"></span>
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : searchTerm ? (
              <Empty
                description={
                  <span className="text-gray-500">
                    Không tìm thấy bài học nào phù hợp với "{searchTerm}"
                  </span>
                }
                className="py-16"
              />
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl text-gray-600 mb-2">
                  Tìm kiếm bài học
                </h2>
                <p className="text-gray-500">
                  Nhập từ khóa để tìm kiếm bài học phù hợp
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
