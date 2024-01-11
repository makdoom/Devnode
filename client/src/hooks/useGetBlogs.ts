import { getBlogList } from "@/api/blogs";
import { useQuery } from "react-query";
import { useCreateBlog } from "./useCreateBlog";
import { useAppDispatch } from "./storeHook";
import { setBlogList } from "@/store/reducers/blogReducer";

export const useGetBlogs = () => {
  const createBlogMutation = useCreateBlog();

  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: "GetBlogs",
    queryFn: getBlogList,
    onSuccess: (data) => {
      dispatch(setBlogList(data?.data || []));
    },
    onSettled: async (data, error) => {
      if (error) {
        console.log(error);
      } else if (data?.data.length === 0) {
        console.log("should create new blog");
        await createBlogMutation.mutate({ title: "Untitled", contents: "" });
      }
    },
  });
};
