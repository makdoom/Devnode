import { getPublishedBlogs } from "@/api/blogs";
import { useQuery } from "react-query";
import { useAppDispatch } from "./storeHook";
import { setPublishedBlogs } from "@/store/reducers/blogReducer";

const useGetAllPublishedBlogs = () => {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: "GetPublishedBlogs",
    queryFn: getPublishedBlogs,
    onSettled: (data) => {
      dispatch(setPublishedBlogs(data));
    },
  });
};

export default useGetAllPublishedBlogs;
