import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useCourseList from "./useCourseList";
import usePagination from "@/hooks/usePagination";
import CustomDrawer from "@/components/CustomDrawer";
import CustomButton from "@/components/CustomButton";
import CourseStepper from "./CourseStepper";
import { fetchCoachesDropdownAPI } from "@/store/feature/admin";
import { motion, AnimatePresence } from "framer-motion";

const CourseList = () => {
  const { pageNo, pageSize, nextPage, prevPage } = usePagination(1, 6);
  const { coursesDetails, loading, error } = useCourseList(pageNo, pageSize);
  const courses = coursesDetails.courses;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { coachesList = [], coachesLoading = false } = useSelector(
    (state) => state.admin || {}
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Navigate to Course Details
  const handleCourseClick = (courseId) => navigate(`${courseId}`);

  // Open Add Course Drawer
  const handleAddCourse = () => {
    dispatch(fetchCoachesDropdownAPI());
    setIsDrawerOpen(true);
  };

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="flex-1 max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 mt-10 gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100">
            All Courses
          </h1>
          <CustomButton
            onClick={handleAddCourse}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Add Course
          </CustomButton>
        </div>

        {/* Course Cards */}
        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            Loading...
          </p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : courses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 ">
              {courses.map((course, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="dark:bg-gray-800 rounded-2xl  hover:shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                  onClick={() => handleCourseClick(course.course_id)}
                >
                  <div>
                    <h2 className="text-xl font-semibold  dark:text-gray-100 mb-2">
                      {course.course_name}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      Duration: {course.duration}
                    </p>

                    <div className="mb-3">
                      <h3 className="font-semibold  dark:text-gray-200 mb-1">
                        For:
                      </h3>
                      <p className="text-gray-900 dark:text-gray-300 text-sm line-clamp-3 whitespace-pre-line">
                        {course.target_audience}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold  dark:text-gray-200 mb-1">
                        Overview:
                      </h3>
                      <p className="text-gray-900 dark:text-gray-300 text-sm line-clamp-3">
                        {course.curriculum_description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={prevPage}
                disabled={!coursesDetails.has_prev_page}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Prev
              </button>
              <span className="text-gray-700 dark:text-gray-300 font-medium px-4">
                Page {pageNo}
              </span>
              <button
                onClick={nextPage}
                disabled={!coursesDetails.has_next_page}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">
            No courses found.
          </p>
        )}
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[500px] bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <CustomDrawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              title="Add New Course"
              footer={null}
            >
              <CourseStepper
                onClose={() => setIsDrawerOpen(false)}
                coaches={coachesList}
                coachesLoading={coachesLoading}
                course={null}
              />
            </CustomDrawer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseList;
