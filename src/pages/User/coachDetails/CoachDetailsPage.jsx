import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import useCoachDetailsPage from "./useCoachDetailsPage";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachDetailsPage = () => {
  const { videoId } = useParams();
  const {
    coach,
    course,
    loading,
    error,
    enrollInCourse,
    handleEnroll,
    message,
    enrolling,
    allCoursesFeedback,
  } = useCoachDetailsPage(videoId);
  const [showCurriculum, setShowCurriculum] = useState(true);
  const [showTargetAudience, setShowTargetAudience] = useState(true);
  const [showLearningOutcomes, setShowLearningOutcomes] = useState(true);


  if (loading)
    return (
      <p className="text-center py-20 text-xl text-gray-700 bg-gray-50 min-h-screen">
        Loading coach details...
      </p>
    );

  if (!coach)
    return <p className="text-center py-20 text-xl">No details found</p>;

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
      return videoId ? `https://www.youtube.com/embed/${videoId}` : fallbackUrl;
    } catch {
      return fallbackUrl;
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 flex flex-col scroll-smooth">
      {/* Title */}
      <section className="py-14 px-6 md:px-20 text-center bg-gradient-to-r">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">{coach.title}</h1>
      </section>

      {/* Video */}
      {coach.video_url && (
        <section className="px-4 md:px-10 py-10 flex justify-center">
          <div className="aspect-video w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(coach.video_url)}
              title={coach.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Stats + Join Button */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <FaClock className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-bold">{coach.duration}</p>
              <p className="text-gray-500 text-sm">of Training</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-bold">{formatDate(coach.created_on)}</p>
              <p className="text-gray-500 text-sm">Instant Access</p>
            </div>
          </div>
        </div>

        {message && <p className="text-red-600 font-semibold mb-2">{message}</p>}
        <button
          onClick={handleEnroll}
          disabled={enrolling}
          className={`w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white cursor-pointer font-bold px-8 py-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300 ${enrolling ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {enrolling ? "Enrolling..." : "Join the Program"}
        </button>
      </section>

      {/* Course Overview */}
      {course && (
        <section className="bg-white py-12 px-6 md:px-20 mb-10 shadow-inner rounded-xl mx-4 md:mx-10">
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {["Who is this for", "What you’ll learn", "The curriculum", "Meet your trainer"].map(
              (item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase().replace(/’| /g, "-")}`}
                  className="text-blue-600 font-semibold hover:underline text-sm md:text-lg"
                >
                  {item}
                </a>
              )
            )}
          </div>

          <div className="space-y-10 max-w-4xl mx-auto text-center">
            {course.target_audience && (
              <div id="who" className="space-y-2">
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setShowTargetAudience(!showTargetAudience)}
                >
                  Who is this for
                </h3>
                {showTargetAudience && (
                  <p className="text-base md:text-lg text-gray-700 text-left leading-relaxed">
                    {course.target_audience}
                  </p>
                )}
              </div>
            )}

            {course.learning_outcomes && (
              <div id="learn" className="space-y-2">
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setShowLearningOutcomes(!showLearningOutcomes)}
                >
                  What you’ll learn
                </h3>
                {showLearningOutcomes && (
                  <p className="text-base md:text-lg text-gray-700 text-left leading-relaxed">
                    {course.learning_outcomes}
                  </p>
                )}
              </div>
            )}

            {course.curriculum_description && (
              <div id="curriculum" className="space-y-2">
                <h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition"
                  onClick={() => setShowCurriculum(!showCurriculum)}
                >
                  The curriculum
                </h3>
                {showCurriculum && (
                  <p className="text-base md:text-lg text-gray-700 text-left leading-relaxed">
                    {course.curriculum_description}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Coach Info */}
      <section
        id="coach-info"
        className="w-full mb-8 py-16 px-6 md:px-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      >
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Meet your trainer
          </h3>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Get to know the expert guiding your learning journey
          </p>
        </div>

        {/* Card Container */}
        <div
          className="relative flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto
    bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')",
            }}
          ></div>

          {/* Gradient overlay for better readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent"></div>

          {/* Trainer Info */}
          <div className="relative z-10 flex-1 text-center md:text-left space-y-4 p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {coach.coach_name}
            </h2>
            <p className="text-lg text-blue-600 font-semibold">
              {coach.professional_title}
            </p>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              {coach.bio ? `${coach.bio.substring(0, 900)}...` : "No bio available"}
            </p>

            <Link
              to={`/coach-profile/${coach.coach_id}`}
              className="inline-block mt-4 text-blue-700 font-semibold hover:text-blue-900 hover:underline transition"
            >
              Learn more about {coach.coach_name}
            </Link>
          </div>

          {/* Profile Image */}
          <div className="relative z-10 flex justify-center md:justify-end p-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white">
              <img
                src={`${BASE_URL}${coach.profile_image}`}
                alt={coach.coach_name}
                className="w-48 h-48 md:w-64 md:h-64 object-fit transform hover:scale-105 transition duration-500 ease-in-out"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      {allCoursesFeedback && allCoursesFeedback.length > 0 && (
        <section className="py-12 px-6 md:px-20 bg-white">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-2">
              What Our Users Say
            </h3>
            <p className="text-gray-600">Real feedback from our valued users</p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {allCoursesFeedback.map((feedback) => (
              <div
                key={feedback.feedback_id}
                className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-200"
              >
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.64a1 1 0 00.95.69h3.832c.969 0 1.371 1.24.588 1.81l-3.1 2.253a1 1 0 00-.364 1.118l1.184 3.64c.3.921-.755 1.688-1.54 1.118l-3.1-2.253a1 1 0 00-1.176 0l-3.1 2.253c-.784.57-1.838-.197-1.539-1.118l1.183-3.64a1 1 0 00-.364-1.118l-3.1-2.253c-.783-.57-.38-1.81.588-1.81h3.832a1 1 0 00.951-.69l1.184-3.64z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 mb-4 line-clamp-5">
                  "{feedback.comments}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={`${BASE_URL}${feedback.profile_picture_url}`}
                    alt={feedback.user_name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{feedback.user_name}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(feedback.created_on)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CoachDetailsPage;
