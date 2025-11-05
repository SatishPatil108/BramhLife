import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoachesVideosAPI } from "@/store/feature/user";

const useCoachesInfoPage = (subdomainId, coachId) => {
  const dispatch = useDispatch();
  const { coachesVideos, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (subdomainId === undefined) subdomainId = 0;
    if (coachId === undefined) coachId = 0;

    dispatch(fetchCoachesVideosAPI({
      pageNo: 1,
      pageSize: 20,
      subdomainId,
      coachId
    }));
  }, [subdomainId,coachId, dispatch]);

  return {
    videos: coachesVideos || [],
    loading: isLoading,
    error,
  };
};

export default useCoachesInfoPage;
