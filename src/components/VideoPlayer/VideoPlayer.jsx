import { useState } from "react";

const VideoPlayer = ({ videoUrl, thumbnailUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

  const getYouTubeEmbedUrl = (url, fallbackUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ") => {
    if (!url || typeof url !== "string") return fallbackUrl;

    try {
      const parsedUrl = new URL(url);
      let videoId = "";

      if (parsedUrl.searchParams.has("v")) videoId = parsedUrl.searchParams.get("v");
      else if (parsedUrl.hostname.includes("youtu.be")) videoId = parsedUrl.pathname.slice(1);
      else if (parsedUrl.pathname.startsWith("/shorts/")) videoId = parsedUrl.pathname.split("/shorts/")[1];
      else if (parsedUrl.pathname.startsWith("/embed/")) videoId = parsedUrl.pathname.split("/embed/")[1];

      videoId = videoId.split("?")[0].split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}?enablejsapi=1` : fallbackUrl;
    } catch {
      return fallbackUrl;
    }
  };

  return (
    <div className="mt-4 w-full relative aspect-video rounded-lg overflow-hidden shadow-md">
      {!isPlaying ? (
        // ▶ Thumbnail View
        <div
          className="cursor-pointer w-full h-full bg-black"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={`${BASE_URL}${thumbnailUrl}`}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white bg-opacity-75 rounded-full p-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4l12 6-12 6V4z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // 🎥 Video View
        <div className="relative w-full h-full">
          <iframe
            src={getYouTubeEmbedUrl(videoUrl)}
            title="Course Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>

          {/* ✖ Close Button to show thumbnail again */}
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-3 right-3 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition"
            title="Close video"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

