import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubcategoriesAPI } from "@/store/feature/user"; 

const useSubCategoriesPage = (domain_id) => {
  const dispatch = useDispatch();
  const { subcategories, isLoading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (!domain_id || domain_id === "undefined") return; 
  dispatch(fetchSubcategoriesAPI({ pageNo: 1, pageSize: 20, domainId: domain_id }));

  }, [domain_id, dispatch]);

  const subCats = subcategories[domain_id];

  return {
    subcategories:subCats,
    loading: isLoading,
    error,
  };
};

export default useSubCategoriesPage;
