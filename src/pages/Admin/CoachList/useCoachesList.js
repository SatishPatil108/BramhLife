import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCoachesAPI, getAllDomains } from "@/store/feature/admin";

const useCoachesList = (pageNo = 1, pageSize = 10) => {
  const dispatch = useDispatch();
  const { coaches, loading, error, domains, subdomains } = useSelector(
    (state) => state.admin
  );

  // Fetch coaches with pagination
 useEffect(() => {
   
    dispatch(fetchAllCoachesAPI({ pageNo, pageSize }));
  
}, [dispatch, pageNo, pageSize]);

  // Fetch all domains
  useEffect(() => {
    dispatch(getAllDomains());
  }, [dispatch]);

  return { coaches, loading, error, domains, subdomains };
};

export default useCoachesList;
