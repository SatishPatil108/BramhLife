import React from "react";

const CourseCard = ({ course }) => {
  const {
    course_name,
    coach_name,
    target_audience,
    learning_outcomes,
    curriculum_description,
    duration,
  } = course;

  return (
    <div className="
      w-full
      max-w-md lg:max-w-2xl
      mx-auto
      bg-[url(/card_background.png)]
      bg-cover bg-center
      shadow-md rounded-lg
      m-4
      px-4 md:px-8 lg:px-16
      py-4 sm:py-6
      mb-6
      border border-gray-200
      hover:shadow-lg transition-shadow
    ">
      <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2">{course_name}</h2>

      <p className="text-xs md:text-sm text-gray-500 mb-4">
        👨‍🏫 Coach: <strong>{coach_name}</strong>
      </p>

      <div className="text-xs md:text-sm text-gray-700 mb-4">
        <strong>Duration:</strong> {duration?.hours || "not specified"}h {duration?.minutes || "not specified"}m
      </div>

      <div className="mb-4">
        <h3 className="text-sm md:text-md font-semibold text-gray-700 mb-1">🎯 Target Audience</h3>
        <p className="whitespace-pre-line text-gray-600 text-xs md:text-sm">{target_audience}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm md:text-md font-semibold text-gray-700 mb-1">📚 Learning Outcomes</h3>
        <p className="whitespace-pre-line text-gray-600 text-xs md:text-sm">{learning_outcomes}</p>
      </div>

      <div>
        <h3 className="text-sm md:text-md font-semibold text-gray-700 mb-1">📝 Curriculum Description</h3>
        <p className="text-gray-600 text-xs md:text-sm">{curriculum_description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
