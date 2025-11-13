import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Users, Clock, SquarePen, Trash2 } from "lucide-react";
import CustomButton from "@/components/CustomButton";
import toast from "react-hot-toast";
import VideoPlayer from "@/components/VideoPlayer";
import EditCourse from "./EditCourse";
import useCourseDetails from "./useCourseDetails";
import EditCourseCurriculum from "./EditCourseCurriculum";

const CourseDetails = () => {
  const { courseId } = useParams();
  const {
    courseDetails,
    curriculumDetails,
    loading,
    error,
    isDrawerOpen,
    isCurriculumDrawerOpen,
    isCurriculumEditing,
    setCurriculumDetails,
    handleEdit,
    handleCurriculumEdit,
    handleFormSubmit,
    handleCurriculumFormSubmit,
    handleDelete,
    handleCurriculumDelete,
    setIsDrawerOpen,
    setIsCurriculumDrawerOpen,
    setIsCurriculumEditing,
  } = useCourseDetails(courseId);
  // console.log(courseDetails);


  // --- Conditional UI States ---
  if (loading && !isDrawerOpen) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading course details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">{error.message}</p>
      </div>
    );
  }

  if (!courseDetails) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-500 text-lg">No course found.</p>
      </div>
    );
  }

  // --- Destructure course details ---
  const {
    course_name,
    target_audience,
    learning_outcomes,
    curriculum_description,
    duration,
    curriculum_outline = [],
    created_on,
    intro_video,
    videos = [],
  } = courseDetails;


  // --- Render ---
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* --- Course Header --- */}
      <div className="bg-gradient-to-r from-blue-700 to-teal-600 p-5 sm:p-8 rounded-2xl shadow-md text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{course_name}</h1>
            <p className="text-xs sm:text-sm opacity-90">
              Created on {new Date(created_on).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm sm:text-base">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>{duration}</span>
            </div>
          </div>

          {/* --- Action Buttons --- */}
          <div className="flex items-center space-x-3 sm:space-x-4 ml-auto">
            <div
              onClick={handleEdit}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200
                                 dark:bg-blue-800 dark:hover:bg-blue-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer" />

            </div>

            <div
              onClick={() => handleDelete(courseId)}
              variant="danger"
              className="p-2 rounded-full bg-red-100 hover:bg-red-200
                                 dark:bg-red-800 dark:hover:bg-red-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <Trash2 className="text-red-600 dark:text-red-300 w-6 h-6 sm:w-6 sm:h-6 m-auto cursor-pointer" />

            </div>
          </div>
        </div>
      </div>

      {/* --- Target Audience & Learning Outcomes --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <InfoCard
          title="Target Audience"
          icon={<Users className="w-5 h-5 text-teal-600" />}
          content={target_audience}
        />
        <InfoCard
          title="Learning Outcomes"
          icon={<BookOpen className="w-5 h-5 text-teal-600" />}
          content={learning_outcomes}
        />
      </div>

      {/* --- Overview --- */}
      <Section title="Overview" content={curriculum_description} />

      {/* --- Intro Video --- */}
      {intro_video && (
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3">
            Intro Video
          </h2>
          <div className="space-y-2 text-sm sm:text-base">
            <p>
              <strong>Title:</strong> {intro_video.title}
            </p>
            <p>
              <strong>Description:</strong> {intro_video.description}
            </p>
            <VideoPlayer
              videoUrl={intro_video.video_url}
              thumbnailUrl={intro_video.thumbnail_url}
            />
          </div>
        </div>
      )}

      {/* --- Curriculum Outline --- */}
      <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
        {/* Header + Button Row */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base sm:text-xl font-semibold text-gray-800">
            Curriculum Outline
          </h2>

          <button
            type="button"
            onClick={() => { setIsCurriculumDrawerOpen(true); setIsCurriculumEditing(false); }}
            className="px-2 py-1.5 sm:px-4 sm:py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm rounded-md shadow-sm
            transition-colors duration-200 cursor-pointer font-semibold"
          >
            + Add Curriculum Outline
          </button>

        </div>

        <div className="space-y-4 sm:space-y-5">
          {curriculum_outline.map((item, index) => {
            const relatedVideos = videos.filter(
              (vid) => vid.curriculum_outline_id === item.id
            );

            return (
              <div
                key={index}
                className="relative p-3 sm:p-4 rounded-lg border border-gray-200 bg-gray-50 hover:shadow-md transition"
              >
                {/* Header + Buttons */}
                <div className="flex justify-end items-start mb-2">

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCurriculumEdit(item.id)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-200
                                 dark:bg-blue-800 dark:hover:bg-blue-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Edit"
                    >
                      <SquarePen className="text-blue-600 dark:text-blue-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer" />
                    </button>
                    <button
                      onClick={() => handleCurriculumDelete(item.id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200
                                 dark:bg-red-800 dark:hover:bg-red-700
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      title="Delete"
                    >
                      <Trash2 className="text-red-600 dark:text-red-300 w-5 h-5 sm:w-6 sm:h-6 m-auto cursor-pointer" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base sm:text-xl font-semibold text-gray-900 mb-2">
                  {item.header_type} {item.sequence_no} – {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3">
                  {item.description}
                </p>

                {/* Related Videos */}
                {relatedVideos.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {relatedVideos.map((video) => (
                      <VideoPlayer
                        key={video.id}
                        videoUrl={video.video_url}
                        thumbnailUrl={video.thumbnail_url}
                      />
                    ))}
                  </div>
                )}
              </div>

            );
          })}
        </div>
      </div>

      {/* --- Drawer for Editing course --- */}
      {isDrawerOpen && (
        <EditCourse
          courseDetails={courseDetails}
          onClose={() => setIsDrawerOpen(false)}
          isDrawerOpen={isDrawerOpen}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* --- Drawer for Editing curriculum item --- */}
      {isCurriculumDrawerOpen && (
        <EditCourseCurriculum
          curriculumDetails={curriculumDetails}
          onClose={() => {
            setIsCurriculumDrawerOpen(false);
            setIsCurriculumEditing(false);
            setCurriculumDetails(null);
          }}
          isDrawerOpen={isCurriculumDrawerOpen}
          isEditing={isCurriculumEditing}
          onSubmit={handleCurriculumFormSubmit}
        />
      )}
    </div>
  );
};

// --- Reusable Subcomponents ---
const InfoCard = ({ title, icon, content }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl border border-gray-200 shadow-sm">
    <h2 className="text-base sm:text-lg font-semibold flex items-center text-gray-800 mb-2 gap-2">
      {icon}
      {title}
    </h2>
    <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">
      {content}
    </p>
  </div>
);

const Section = ({ title, content }) => (
  <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-gray-200">
    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
      {title}
    </h2>
    <p className="text-gray-600 text-sm sm:text-base">{content}</p>
  </div>
);

export default CourseDetails;
