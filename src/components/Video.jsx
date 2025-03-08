import React from "react";
import getYouTubeEmbedUrl from "../utils/transformEmbededUrl.js";

const Video = ({ chapter, lesson, height, ...props }) => {
  let contentLink = lesson?.lessonContent;
  const embededUrl = getYouTubeEmbedUrl(contentLink);

  return (
    <div className="w-full">
      {embededUrl ? (
        <iframe
          width="100%"
          height={height}
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
