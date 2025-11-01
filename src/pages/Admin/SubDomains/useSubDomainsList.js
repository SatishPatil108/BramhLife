import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addNewSubDomain,
  deleteSubDomainAPI,
  fetchAllSubDomainsAPI,
  updateSubDomainAPI,
} from "@/store/feature/admin";

const useSubDomainsList = (domainId) => {
  const dispatch = useDispatch();
  const { subdomains, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (domainId && !isNaN(domainId)) {
      dispatch(
        fetchAllSubDomainsAPI({
          pageNo: 1,
          pageSize: 10,
          domainId: Number(domainId),
        })
      );
    }
  }, [domainId, dispatch]);

  const addSubDomain = (subDomainData) => {
    dispatch(addNewSubDomain(subDomainData))
      .unwrap()
      .then(() => {
        dispatch(
          fetchAllSubDomainsAPI({
            pageNo: 1,
            pageSize: 10,
            domainId: Number(domainId),
          })
        );
      })
      .catch((err) => {
        console.error("Failed to add domain:", err);
      });
  };

const updateSubDomain = (subdomainId, data) => {
  console.log("Updating subdomain with ID:", subdomainId, "and data:", data);
  dispatch(updateSubDomainAPI({ subdomainId, data }))
    .unwrap()
    .then(() => {
      dispatch(fetchAllSubDomainsAPI({
        pageNo: 1,
        pageSize: 10,
        domainId: Number(domainId),
      }));
    })
    .catch((err) => {
      console.error("Failed to update subdomain:", err);
    });
};



  const deleteSubdomain = (subdomainId) => {
    console.log("Deleting subdomain with ID:", subdomainId);
    dispatch(deleteSubDomainAPI(subdomainId))
      .unwrap()
      .then(() => {
        dispatch(
          fetchAllSubDomainsAPI({
            pageNo: 1,
            pageSize: 10,
            domainId: Number(domainId),
          })
        );
      })
      .catch((err) => {
        console.error("Failed to delete subdomain:", err);
      }); 
  };

  return { subdomains, loading, error, addSubDomain, updateSubDomain ,deleteSubdomain};
};

export default useSubDomainsList;
