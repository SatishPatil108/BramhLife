import { fetchAllMusicsAPI } from "@/store/feature/admin";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const useMusicList = (pageNo, pageSize) => {
    const dispatch = useDispatch();
    const { audioList } = useSelector((state) => state.admin);

    useEffect(() => {
        dispatch(fetchAllMusicsAPI({ pageNo, pageSize }));
    }, [dispatch, pageNo, pageSize]);

    return { audioList };
};

export default useMusicList;
