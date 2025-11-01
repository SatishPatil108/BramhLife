import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCoursesList from "./useCoursesList";
import { BookOpen } from "lucide-react";
const BASE_URL = import.meta.env.VITE_BASE_URL_IMG;

const CourseList = () => {
  const { courses, loading, error, coachNames, courseNames } = useCoursesList();
  const navigate = useNavigate();

  const optCourseName = useRef(null);
  const optCoachName = useRef(null);

  const handleCourseClick = (domain_id, domain_name) => {
    console.log("Clicked domain_id:", domain_id, "domain_name:", domain_name);
    navigate(`/subcategories/${domain_id}`, { state: { domain_name } });
  };

  return (
    <div className="min-h-screen from-gray-50 to-white text-black flex flex-col px-8 mb-6">
      <main className="flex-grow container mx-auto px-6 py-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-9">
            Explore Course Categories
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Choose a category and start your learning journey
          </p>
        </div>

        {/* Loading & Error States */}
        {loading && (
          <p className="text-center text-gray-500 animate-pulse">
            Loading courses...
          </p>
        )}
        {error && <p className="text-center text-red-600">{error.message}</p>}
        {/* Search Filters */}
        {courses.length > 0 && !loading && (
          <div className="max-w-4xl mx-auto mb-10">
            <form
              className="flex flex-wrap items-end gap-4 p-6 bg-gradient-to-b from-[#75e7e0] to-[#46e1f6] rounded-lg  shadow-md hover:shadow-lg transition-shadow duration-300"
              onSubmit={(e) => {
                e.preventDefault();
                let courseName = optCourseName.current.value;
                let coachName = optCoachName.current.value;
                navigate("course/search", { state: { courseName, coachName } });
              }}
            >

              <div className="flex flex-col flex-grow min-w-[45%]">
                <label className="text-sm font-bold text-black mb-1">
                  Course
                </label>
                <select
                  ref={optCourseName}
                  className="px-3 py-2 border border-gray-500 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Course</option>
                  {courseNames.map((name, i) => (
                    <option key={i}>{name}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col flex-grow min-w-[45%]">
                <label className="text-sm font-bold text-black mb-1">
                  Coach
                </label>
                <select
                  ref={optCoachName}
                  className="px-3 py-2 border border-gray-500 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Coach</option>
                  {coachNames.map((name, i) => (
                    <option key={i}>{name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700 transition text-sm mt-4 sm:mt-0"
              >
                Search
              </button>
            </form>
          </div>
        )}


        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <div
              key={course.domain_id}
              className="group relative shadow-lg border-1 border-gray-300 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer bg-white "
              onClick={() =>
                handleCourseClick(course.domain_id, course.domain_name)
              }
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={`${BASE_URL}${course.domain_thumbnail}`}
                  alt={course.domain_name}
                  className="w-full h-full object-fit transform group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                  {course.domain_name}
                </h2>
                <div className="flex items-center text-gray-500 text-sm">
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
