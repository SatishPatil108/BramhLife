import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useEnrolledCourses from "./useEnrolledCourses";
import { BookOpen, Clock, Calendar } from "lucide-react";
import { FaBookOpen, FaExclamationCircle } from "react-icons/fa";

const EnrolledCourses = () => {
  const { myCoursesDetails, isLoading, error } = useEnrolledCourses();
  const myCourses = myCoursesDetails.courses;

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-500 text-lg animate-pulse">Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    if (error === "No courses found") {
      return (
        <div className="flex flex-col items-center justify-center text-center mt-16 mb-[100px]">
          <FaBookOpen className="text-blue-500 text-5xl" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            You haven't enrolled in any courses yet.
          </p>

          <Link to={'/courses'} className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Explore Courses</Link>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center text-center mt-16">
        <FaExclamationCircle className="text-red-600 text-4xl" />
        <p className="mt-2 text-red-600">Error: {error?.message ? error.message : error}</p>
      </div>
    );
  }

  if (!myCourses || myCourses.length === 0) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10">
        You haven’t enrolled in any courses yet.
      </p>
    );
  }

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📚 My Enrolled Courses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course) => (
          <div
            key={course.course_id}
            onClick={() => navigate(`/enrolled-course/${course.course_id}`)}
            className="cursor-pointer bg-white border border-gray-200 hover:border-purple-600 rounded-xl hover:shadow-sm p-5 transition duration-300 group"
          >
            <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-2">
              <BookOpen className="text-blue-500 w-5 h-5" />
              {course.course_name}
            </h3>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                {course.duration.hours}h {course.duration.minutes}m
              </p>

              <p className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                {new Date(course.enrolled_on).toLocaleDateString()}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${course.status === 1
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
                  }`}
              >
                {course.status === 1 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;

