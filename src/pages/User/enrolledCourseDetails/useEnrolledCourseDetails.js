
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrolledCourseDetailsThunk } from "@/store/feature/user/userThunk";

const useEnrolledCourseDetails = (courseId) => {
  const dispatch = useDispatch();

  const { enrolledCourseDetails, isLoading, error } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (courseId) {
      // ✅ Dispatch the thunk
      dispatch(fetchEnrolledCourseDetailsThunk(courseId));
    }
  }, [dispatch, courseId]);

  return { enrolledCourseDetails, isLoading, error };
};

export default useEnrolledCourseDetails;
