import { searchCoursesAPI } from "@/store/feature/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCourseByNameOrCoachName = (searchData, page_no, page_size) => {
    const dispatch = useDispatch();
    const { courses, isLoading, error } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(searchCoursesAPI({ pageNo: page_no, pageSize: page_size, searchData }));

    }, [ page_no, page_size, dispatch]);

    return {
        courses,
        loading: isLoading,
        error,
    };


}
export default useCourseByNameOrCoachName