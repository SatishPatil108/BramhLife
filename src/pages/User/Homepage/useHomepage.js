import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCoursesFeedbackAPI, fetchCoursesCategoriesAPI, fetchFAQsAPI, fetchMusicListAPI, fetchUserDashboardDataAPI, searchAPI } from "@/store/feature/user";


const useHomepage = () => {

  const dispatch = useDispatch();
  const { dashboardData, isLoading, isSpin, error, FAQsDetails, allCoursesFeedback, musicsDetails, searchDetails } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserDashboardDataAPI());
    dispatch(fetchFAQsAPI({ pageNo: 1, pageSize: 6 }));
    dispatch(fetchAllCoursesFeedbackAPI({ pageNo: 1, pageSize: 10 }));
    dispatch(fetchMusicListAPI({ pageNo: 1, pageSize: 10 }));
  }, [dispatch]);


  return { dashboardData, loading: isLoading, isSpin, error, FAQsDetails, allCoursesFeedback, musicsDetails, searchDetails };
};

export default useHomepage;
