import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useCoursesList from "./useCoursesList";
import { BookOpen } from "lucide-react";

const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CourseList = () => {
  const { courses, loading, error } = useCoursesList();
  const navigate = useNavigate();

  const handleCourseClick = (domain_id, domain_name) => {
    navigate(`/subcategories/${domain_id}`, { state: { domain_name } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-black flex flex-col px-4 sm:px-6 md:px-10 py-10">
      <main className="flex-grow container mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mt-4 sm:mt-8">
            Explore Course Categories
          </h1>
          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            Choose a category and start your learning journey
          </p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse pb-4">
            Loading courses...
          </p>
        )}
        {error && <p className="text-center text-red-600">{error.message}</p>}

        {/* Courses Grid */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            sm:gap-8
            justify-items-center
            mb-12
            "
        >
          {courses?.map((course) => (
            <div
              key={course.domain_id}
              className="
                group relative 
                shadow-sm border border-gray-200 
                rounded-2xl overflow-hidden 
                hover:shadow-xl transition-all duration-300 
                cursor-pointer bg-white
                w-[90%] sm:w-[80%] md:w-full
                max-w-sm sm:max-w-none
              "
              onClick={() =>
                handleCourseClick(course.domain_id, course.domain_name)
              }
            >
              {/* Image */}
              <div className="h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                <img
                  src={`${BASE_URL}${course.domain_thumbnail}`}
                  alt={course.domain_name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                  {course.domain_name}
                </h2>
                <div className="flex items-center text-gray-500 text-sm sm:text-base">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Explore courses</span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-20 transition"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CourseList;