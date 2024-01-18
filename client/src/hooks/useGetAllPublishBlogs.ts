import { getPublishedBlogs } from "@/api/blogs";
import { useQuery } from "react-query";

const useGetAllPublishedBlogs = () => {
  return useQuery({
    queryKey: "GetPublishedBlogs",
    queryFn: getPublishedBlogs,
  });
};

export default useGetAllPublishedBlogs;
