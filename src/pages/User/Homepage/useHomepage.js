import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoursesFeedbackAPI, fetchFAQsAPI, fetchUserDashboardDataAPI } from "@/store/feature/user";


const useHomepage = () => {
  const dispatch = useDispatch();
  const { dashboardData, isLoading, error,FAQs,allCoursesFeedback } = useSelector(
    (state) => state.user 
  );

  useEffect(() => {
    dispatch(fetchUserDashboardDataAPI());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFAQsAPI({ pageNo: 1, pageSize: 4})); 
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllCoursesFeedbackAPI({ pageNo: 1, pageSize: 10})); 
  }, [dispatch]);

  return { dashboardData, loading: isLoading, error, FAQs ,allCoursesFeedback };
};

export default useHomepage;
