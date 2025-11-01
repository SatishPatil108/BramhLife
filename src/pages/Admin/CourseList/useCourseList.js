import { fetchAllCoursesAPI } from "@/store/feature/admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useCourseList = (pageNo , pageSize ) => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const { courses, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllCoursesAPI({ pageNo, pageSize }));
  }, [dispatch, pageNo, pageSize]);

  return { courses, loading, error };
};

export default useCourseList;
