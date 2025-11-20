import { fetchCourseNamesAndCoachNamesAPI, fetchCoursesCategoriesAPI } from "@/store/feature/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCoursesList = () => {
  const dispatch = useDispatch();
  const { domainsDetails, isLoading, error, courseNames, coachNames } = useSelector((state) => state.user);
  const domains = domainsDetails.domains;

  const fetchCourseNamesAndCoachNames = () => {
    dispatch(fetchCourseNamesAndCoachNamesAPI());
  }
  const fetchCourses = () => {
    dispatch(fetchCoursesCategoriesAPI({ pageNo: 1, pageSize: 10 }));
  };

  useEffect(() => {
    fetchCourses();
    fetchCourseNamesAndCoachNames();
  }, [dispatch]);

  // Normalize courses to always have domain_id
  const courses = domains?.map(course => ({
    ...course,
    domain_id: course.domain_id || course.id
  }));

  return { courses, loading: isLoading, error, fetchCourses, courseNames, coachNames };
};

export default useCoursesList;
