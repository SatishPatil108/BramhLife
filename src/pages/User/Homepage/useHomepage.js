import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoursesFeedbackAPI, fetchCoursesCategoriesAPI, fetchFAQsAPI, fetchMusicListAPI, fetchUserDashboardDataAPI } from "@/store/feature/user";


const useHomepage = () => {
  const dispatch = useDispatch();
  const { dashboardData, isLoading, error, FAQsDetails, allCoursesFeedback, musicsDetails } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserDashboardDataAPI());
    dispatch(fetchFAQsAPI({ pageNo: 1, pageSize: 4 }));
    dispatch(fetchAllCoursesFeedbackAPI({ pageNo: 1, pageSize: 10 }));
    dispatch(fetchMusicListAPI({ pageNo: 1, pageSize: 10 }));    
  }, [dispatch]);

  return { dashboardData, loading: isLoading, error, FAQsDetails, allCoursesFeedback, musicsDetails };
};

export default useHomepage;
