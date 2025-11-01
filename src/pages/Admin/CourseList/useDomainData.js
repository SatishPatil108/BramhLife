import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDomains, fetchAllSubDomainsAPI } from "@/store/feature/admin";

/**
 * A reusable hook to manage domain and subdomain data.
 * Can be used in any component (CourseDetails, CourseIntroVideo, etc.)
 */
const useDomainData = () => {
  const dispatch = useDispatch();
  const { loading, error, domains, subdomains } = useSelector(
    (state) => state.admin
  );

  // Fetch all domains on mount
  useEffect(() => {
    dispatch(getAllDomains());
  }, [dispatch]);

  // Fetch subdomains based on selected domain
  const fetchSubdomains = useCallback(
    async (domainId) => {
      if (!domainId) return;
      try {
        await dispatch(fetchAllSubDomainsAPI({ domainId })).unwrap();
      } catch (err) {
        console.error("Failed to fetch subdomains:", err);
      }
    },
    [dispatch]
  );

  return { loading, error, domains, subdomains, fetchSubdomains };
};

export default useDomainData;
