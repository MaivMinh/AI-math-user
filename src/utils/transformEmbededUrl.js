const getYouTubeEmbedUrl = (url) => {
  // If already in embed format, return as is
  if (url === null || url === undefined) {
    return null;
  }
  if (url.includes("youtube.com/embed")) {
    return url;
  }
  let videoId = "";
  // Extract video ID from different YouTube URL formats
  if (url.includes("youtube.com/watch")) {
    // Handle youtube.com/watch format
    const urlObj = new URL(url);
    videoId = urlObj.searchParams.get("v");
  } else if (url.includes("youtu.be")) {
    // Handle youtu.be format
    const urlParts = url.split("/");
    videoId = urlParts[urlParts.length - 1].split("?")[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default getYouTubeEmbedUrl;