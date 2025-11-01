import { fetchAllCoachesAPI } from "@/store/feature/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const useGetAllCoaches = (pageNo = 1, pageSize = 10) => {
  const dispatch = useDispatch();
  const { coaches, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllCoachesAPI({ pageNo, pageSize })); 
  }, [dispatch, pageNo, pageSize]);

  return { coaches, isLoading, error };
};

export default useGetAllCoaches;
