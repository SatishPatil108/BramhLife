import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useEnrolledCourseDetails from "./useEnrolledCourseDetails";
import FeedbackForm from "../FeedbackForm";

const EnrolledCourseDetails = () => {
  const { courseId } = useParams();
  const { enrolledCourseDetails, isLoading, error } = useEnrolledCourseDetails(courseId);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

  useEffect(() => {
    if (enrolledCourseDetails && enrolledCourseDetails.length > 0) {
      setSelectedVideo(enrolledCourseDetails[0]);
    }
  }, [enrolledCourseDetails]);

  useEffect(() => {
    if (error?.message === "Authorization token is missing.") {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading)
    return (
      <p className="text-blue-600 text-center mt-10">
        Loading course videos...
      </p>
    );

  if (error) {
    return <p className="text-red-600 text-center mt-10">Error: {error.message}</p>;
  }
  if (!enrolledCourseDetails || enrolledCourseDetails.length === 0)
    return (
      <p className="text-gray-500 text-center mt-10">
        No videos found for this course.
      </p>
    );

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        Enrolled Course Videos
      </h1>

      {/* Selected Video Player */}
      {selectedVideo && (
        <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
          <iframe
            width="100%"
            height="450"
            src={getEmbedUrl(selectedVideo.video_url)}
            title={selectedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Chapter {selectedVideo.sequence_no}: {selectedVideo.title}
            </h2>
            <p className="text-gray-700 mb-2">{selectedVideo.description}</p>
            <p className="text-sm text-gray-500 italic">
              {selectedVideo.header_type}
            </p>
          </div>
        </div>
      )}

      {/* Video List */}
      <div className="space-y-6">
        {enrolledCourseDetails.map((video) => (
          <div
            key={video.id}
            className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition duration-300"
            onClick={() => setSelectedVideo(video)}
          >
            <img
              src={`${BASE_URL}${video.thumbnail_url}`}
              alt={video.title}
              className="w-full md:w-72 h-48 md:h-48 object-cover"
            />
            <div className="p-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Chapter {video.sequence_no}: {video.title}
              </h3>
              <p className="text-gray-600 mb-2">{video.description}</p>
              <p className="text-sm text-gray-500 italic">
                {video.header_type}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <div className="mt-10">
        {enrolledCourseDetails.length > 0 && (
          <FeedbackForm
            courseId={Number(courseId)} // ensure number
            enrollmentId={enrolledCourseDetails[0].enrollment_id || 1} // fallback for testing
          />
        )}
      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
