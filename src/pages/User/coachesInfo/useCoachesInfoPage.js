import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoachesVideosAPI } from "@/store/feature/user";

const useCoachesInfoPage = (subdomainId, coachId) => {
  const dispatch = useDispatch();
  const { videosDetails, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (subdomainId === undefined) subdomainId = 0;
    if (coachId === undefined) coachId = 0;

    dispatch(fetchCoachesVideosAPI({
      pageNo: 1,
      pageSize: 10,
      subdomainId,
      coachId
    }));
  }, [subdomainId, coachId, dispatch]);

  return {
    videosDetails,
    loading: isLoading,
    error,
  };
};

export default useCoachesInfoPage;
