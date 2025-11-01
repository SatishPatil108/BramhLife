// src/pages/User/enrolledCourses/useEnrolledCourses.js
import { fetchMyCoursesThunk } from "@/store/feature/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useEnrolledCourses = (pageNo = 1, pageSize = 10) => {
  const dispatch = useDispatch();
  const { myCourses, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchMyCoursesThunk({ pageNo, pageSize }));
  }, [dispatch, pageNo, pageSize]);

  return { myCourses, isLoading, error };
};

export default useEnrolledCourses;
