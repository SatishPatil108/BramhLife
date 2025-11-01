import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollInCourseAPI,
  fetchCoachDetailsAPI,
  fetchCourseDetailsById,
  fetchCourseFeedbackById,
} from "@/store/feature/user";
import { toast } from "react-toastify";

const useCoachDetailsPage = (videoId) => {
  const dispatch = useDispatch();
  const { coachDetails, courseDetails, isLoading, error,allCoursesFeedback} =
    useSelector((state) => state.user);
    console.log("allCoursesFeedback",allCoursesFeedback);

  const [enrolling, setEnrolling] = useState(false);
 

  // Fetch coach details
  useEffect(() => {
    if (videoId && videoId !== "undefined") {
      dispatch(fetchCoachDetailsAPI(videoId));
    }
  }, [videoId, dispatch]);

  // Fetch course details
  useEffect(() => {
    if (coachDetails?.course_id) {
      dispatch(fetchCourseDetailsById(coachDetails.course_id));
    }
  }, [coachDetails, dispatch]);


// fetch all feedback for courses
useEffect(() => {
  if (courseDetails?.course_id) {
    dispatch(
      fetchCourseFeedbackById({
        courseId: courseDetails.course_id,
        pageNo: 1,
        pageSize: 10,
      })
    );
    console.log("courseDetails", courseDetails);
  }
}, [courseDetails, dispatch]);




  // Enroll in course
  const enrollInCourse = async () => {
    if (!courseDetails?.course_id) return;
    try {
      setEnrolling(true);
      const res = await dispatch(enrollInCourseAPI(courseDetails.course_id)).unwrap();
      if (res?.data) {
        const { user_name, course_name } = res.data;
        toast.success(`🎉 Welcome ${user_name}! You have successfully enrolled in "${course_name}".`);
      } else {
        toast.success(res?.message || "Enrollment successful!");
      }
    } catch (err) {
      toast.error("Enrollment failed: " + (err?.message || "Unknown error"));
    } finally {
      setEnrolling(false);
    }
  };

  return {
    coach: coachDetails,
    course: courseDetails,

    allCoursesFeedback,
     
    loading: isLoading,
    error,
    enrollInCourse,
    enrolling,
  };
};

export default useCoachDetailsPage;
