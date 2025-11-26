import { fetchCoursesCategoriesAPI } from "@/store/feature/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCoursesList = () => {
  const dispatch = useDispatch();
  const { domainsDetails, isLoading, error } = useSelector((state) => state.user);
  const domains = domainsDetails.domains;

  useEffect(() => {
    dispatch(fetchCoursesCategoriesAPI({ pageNo: 1, pageSize: 10 }));
  }, []);

  // Normalize courses to always have domain_id
  const courses = domains?.map(course => ({
    ...course,
    domain_id: course.domain_id || course.id
  }));
  return { courses, loading: isLoading, error };
};

export default useCoursesList;