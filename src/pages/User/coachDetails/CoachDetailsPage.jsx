import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import useCoachDetailsPage from "./useCoachDetailsPage";
// import coach1 from "@/assets/coach1.jpg";

// const BASE_URL = "http://192.168.0.118:5001";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CoachDetailsPage = () => {
  const { videoId } = useParams();
  const {
    coach,
    course,
    loading,
    error,
    enrollInCourse,
    enrolling,
    allCoursesFeedback,
  } = useCoachDetailsPage(videoId);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [showTargetAudience, setShowTargetAudience] = useState(false);
  const [showLearningOutcomes, setShowLearningOutcomes] = useState(false);

  if (loading)
    return (
      <p className="text-center py-20 text-xl">Loading coach details...</p>
    );

  // if (error)
  //   return <p className="text-center py-20 text-red-600 text-xl">{error?.message?error?.message:error}</p>;

  if (!coach)
    return <p className="text-center py-20 text-xl">No details found</p>;

  // ✅ Safer YouTube embed URL function
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    const parts = url.split("v=");
    if (parts.length < 2) return ""; // not a valid YouTube link
    const videoId = parts[1];
    const ampersandPosition = videoId.indexOf("&");
    return `https://www.youtube.com/embed/${ampersandPosition !== -1
      ? videoId.substring(0, ampersandPosition)
      : videoId
      }`;
  };
  // console.log(getYouTubeEmbedUrl(coach.video_url), "url", coach.video_url)
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
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col scroll-smooth">
      {/* Title */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h1 className="lg:text-5xl font-extrabold text-xl">{coach.title}</h1>
      </section>

      {/* Video */}
      {coach.video_url && (
        <section className="px-6 md:px-20 mb-6">
          <div className="aspect-video w-full md:w-3/4 mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedUrl(coach.video_url)}
              // src={coach.video_url}
              title={coach.title}
              // title={ getYouTubeEmbedUrl(coach.video_url)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* Stats + Join Button */}
      <section className="max-w-6xl mx-auto px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          <FaClock className="text-blue-600 text-2xl" />
          <div>
            <p className="text-lg font-bold">{coach.duration}</p>
            <p className="text-gray-500 text-sm">of Training</p>
          </div>
          <div className="flex items-center gap-4 bg-white  rounded-xl">
            <FaCalendarAlt className="text-blue-600 text-2xl" />
            <div>
              <p className="text-lg font-bold">{formatDate(coach.created_on)}</p>
              <p className="text-gray-500 text-sm">Instant Access</p>
            </div>
          </div>
        </div>

        <button
          onClick={enrollInCourse}
          disabled={enrolling}
          className={`bg-blue-600 text-white font-bold px-6 py-4 rounded-xl shadow hover:bg-blue-700 transition ${enrolling ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          {enrolling ? "Enrolling..." : "Join the Program"}
        </button>
      </section>

      {/* Course Overview */}
      {course && (
        <section className="bg-white py-12 px-6 md:px-20 mb-10 text-center">
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="#who"
              className="text-blue-600 font-bold text-xs lg:text-lg hover:underline"
            >
              Who is this for
            </a>
            <a
              href="#learn"
              className="text-blue-600 font-bold text-xs lg:text-lg hover:underline"
            >
              What you’ll learn
            </a>
            <a
              href="#curriculum"
              className="text-blue-600 font-bold text-xs lg:text-lg hover:underline"
            >
              The curriculum
            </a>
            <a
              href="#coach-info"
              className="text-blue-600 font-bold  text-xs lg:text-lg hover:underline"
            >
              Meet your trainer
            </a>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto text-center">
            {/* Target Audience */}
            {course.target_audience && (
              <div id="who">
                <h3
                  className="text-3xl font-extrabold mb-2 text-black hover:underline cursor-pointer"
                  onClick={() => setShowTargetAudience(!showTargetAudience)}
                >
                  Who is this for
                </h3>
                {showTargetAudience && (
                  <p className="lg:text-lg text-xl text-gray-700 text-left">
                    {course.target_audience}
                  </p>
                )}
              </div>
            )}

            {/* Learning Outcomes */}
            {course.learning_outcomes && (
              <div id="learn">
                <h3
                  className="text-3xl font-extrabold mb-2 text-black hover:underline cursor-pointer"
                  onClick={() => setShowLearningOutcomes(!showLearningOutcomes)}
                >
                  What you’ll learn
                </h3>
                {showLearningOutcomes && (
                  <p className="lg:text-lg text-xl text-gray-700 text-left">
                    {course.learning_outcomes}
                  </p>
                )}
              </div>
            )}

            {/* Curriculum Description */}
            {course.curriculum_description && (
              <div id="curriculum" className="cursor-pointer">
                <h3
                  className="text-3xl font-extrabold mb-2 text-black hover:underline"
                  onClick={() => setShowCurriculum(!showCurriculum)}
                >
                  The curriculum
                </h3>
                {showCurriculum && (
                  <p className="lg:text-lg text-xl text-gray-700 text-left">
                    {course.curriculum_description}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Coach Info */}
      <section id="coach-info" className="w-full py-12 px-6 md:px-20 bg-white">
        <div className="text-center mb-6">
          <h3 className="text-3xl font-extrabold mb-2 text-black hover:underline">
            Meet your trainer
          </h3>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start max-w-[1440px] mx-auto">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <div>
              <h2 className="lg:text-3xl text-xl font-extrabold">{coach.coach_name}</h2>
              <p className="text-xl text-gray-600 mt-2">
                {coach.professional_title}
              </p>
            </div>
            <div>
              <p className="mt-4 lg:text-lg text-xl text-gray-700 text-left">
                {coach.bio ? `${coach.bio.substring(0, 900)}...` : "No bio available"}
              </p>
              <Link
                to={`/coach-profile/${coach.coach_id}`}
                className="mt-3 inline-block text-blue-600 font-semibold hover:underline"
              >
                Learn more about {coach.coach_name}
              </Link>
            </div>
          </div>

          <div className="flex-shrink-0 flex justify-center md:justify-end">
            <img
              src={`${BASE_URL}${coach.profile_image}`}
              alt={coach.coach_name}
              className="w-96 h-auto rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      {allCoursesFeedback && allCoursesFeedback.length > 0 && (
        <section className="w-full py-12 px-6 md:px-20 bg-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-extrabold mb-2 text-black">
              What Our Users Say
            </h3>
            <p className="text-gray-600">Real feedback from our valued users</p>
          </div>

          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allCoursesFeedback.map((feedback) => (
              <div
                key={feedback.feedback_id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                {/* Rating Stars */}
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < feedback.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.184 3.64a1 1 0 00.95.69h3.832c.969 0 1.371 1.24.588 1.81l-3.1 2.253a1 1 0 00-.364 1.118l1.184 3.64c.3.921-.755 1.688-1.54 1.118l-3.1-2.253a1 1 0 00-1.176 0l-3.1 2.253c-.784.57-1.838-.197-1.539-1.118l1.183-3.64a1 1 0 00-.364-1.118l-3.1-2.253c-.783-.57-.38-1.81.588-1.81h3.832a1 1 0 00.951-.69l1.184-3.64z" />
                    </svg>
                  ))}
                </div>

                {/* Comments */}
                <p className="text-gray-800 mb-4 whitespace-pre-line line-clamp-5">
                  "{feedback.comments}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      `${BASE_URL}${feedback.profile_picture_url}`

                    }
                    alt={feedback.user_name}
                    className="w-12 h-12 rounded-full object-cover"
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