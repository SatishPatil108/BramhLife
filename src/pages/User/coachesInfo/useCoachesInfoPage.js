import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoachesVideosAPI } from "@/store/feature/user"; 

const useCoachesInfoPage = (subdomainId) => {
  const dispatch = useDispatch();
  const { coachesVideos, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (!subdomainId || subdomainId === "undefined") return;

    dispatch(fetchCoachesVideosAPI({ 
      pageNo: 1, 
      pageSize: 20, 
      subdomainId 
    }));
  }, [subdomainId, dispatch]);

  return {
    videos: coachesVideos || [], 
    loading: isLoading,
    error,
  };
};

export default useCoachesInfoPage;
