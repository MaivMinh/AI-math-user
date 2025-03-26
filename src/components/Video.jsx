import React, { useContext, useEffect, useState } from "react";
import getYouTubeEmbedUrl from "../utils/transformEmbededUrl.js";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient.js";
import { AuthContext } from "../context/AuthContext.jsx";

const Video = ({ props }) => {
  const { chapterOrder, lessonOrder } = useParams();
  const [loading, setLoading] = useState(false);
  const { grade } = useContext(AuthContext);
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    if (grade) {
      const fetchLessonDetails = async () => {
        setLoading(true);
        try {
          const response = await apiClient.get(
            `/api/lesson/grade/${grade}/chapterorder/${grade}/lessonorder/${lessonOrder}`
          );
          console.log(response);
          setLesson(response.data);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      };
      fetchLessonDetails();
    }
  }, [chapterOrder, lessonOrder, grade]);

  let contentLink = lesson?.lessonContent;
  const embededUrl = getYouTubeEmbedUrl(contentLink);

  return (
    <div className="w-full">
      {embededUrl ? (
        <iframe
          width="100%"
          height={450}
          src={embededUrl}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          title="Embedded YouTube Video"
        ></iframe>
      ) : (
        <video width="100%" height="auto" controls>
          <source
            src={"https://www.youtube.com/embed/aD6VC8PnOWA"}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default Video;
