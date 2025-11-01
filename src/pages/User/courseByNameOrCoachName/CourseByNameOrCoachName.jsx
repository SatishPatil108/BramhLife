import { useLocation, useNavigate } from "react-router-dom";
import useCourseByNameOrCoachName from "./useCourseByNameOrCoachName";
import CourseCard from "./CourseCard";
import usePagination from "@/hooks";

const CourseByNameOrCoachName = () => {
  const { pageNo, pageSize, nextPage, prevPage } = usePagination(1, 6);
  const location = useLocation();
  const navigate = useNavigate();

  const courseName = location.state?.courseName?.trim() || "";
  const coachName = location.state?.coachName?.trim() || "";
  const searchData = { courseName, coachName };

  const { courses = [], loading, error } = useCourseByNameOrCoachName(
    searchData,
    pageNo,
    pageSize
  );

  const renderSearchSummary = () => {
    const course = courseName ? courseName : "Any";
    const coach = coachName ? coachName : "Any";
    return `Course: ${course} | Coach: ${coach}`; 
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-10">
      {/* 🔍 Search Summary */}
      <h1 className="text-center text-gray-800 font-semibold mb-6 text-lg sm:text-2xl lg:text-3xl">
        Search Results for:{" "}
        <span className="text-blue-600">{renderSearchSummary()}</span>
      </h1>

      {/* 🔁 Loading */}
      {loading && (
        <div className="text-center text-gray-500 text-lg py-10">
          Loading courses...
        </div>
      )}

      {/* ⚠️ Error */}
      {error && (
        <div className="text-center text-red-500 text-lg py-10">
          Error: {typeof error === "string" ? error : error.message}
        </div>
      )}

      {/* ❌ No Results */}
      {!loading && courses.length === 0 && (
        <div className="text-center text-gray-500 text-lg py-20">
          No courses found.{" "}
          <button
            onClick={() => navigate("/courses")}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Go back
          </button>
        </div>
      )}

      {/* ✅ Courses */}
      {!loading && courses.length > 0 && (
        <div className="w-full mx-auto">
          {/* 📚 Course Grid */}
          <div
            className="
              grid 
              grid-cols-1        /* 1 column on small screens */
              lg:grid-cols-2     /* 2 columns on large screens */
              gap-4 sm:gap-6     /* smaller gap on mobile */
              px-0 sm:px-2 lg:px-4
            "
          >
            {courses.map((course) => (
              <CourseCard key={course.course_id} course={course} />
            ))}
          </div>

          {/* 📄 Pagination */}
          <div className="flex justify-center items-center mt-10 space-y-0 space-x-2 sm:space-x-4">
            <button
              onClick={prevPage}
              disabled={pageNo === 1}
              className="
               px-2 py-1 text-xs
               sm:px-4 sm:py-2 sm:text-base
             bg-white border border-gray-300 text-gray-700 rounded-md
             hover:bg-gray-100
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-all"
            >
              ⬅ Prev
            </button>
            <span className="text-gray-700 font-medium text-xs sm:text-lg">
              Page {pageNo}
            </span>
            <button
              onClick={nextPage}
              disabled={courses.length < pageSize}
              className="
              px-2 py-1 text-xs
              sm:px-4 sm:py-2 sm:text-base
            bg-white border border-gray-300 text-gray-700 rounded-md
            hover:bg-gray-100
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all"
            >
              Next ➡
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CourseByNameOrCoachName;
