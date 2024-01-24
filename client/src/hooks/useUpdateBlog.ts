import { updateBlog } from "@/api/blogs";
import { Blog } from "@/types/blog.types";
import { useMutation, useQueryClient } from "react-query";

const useUpdateBlog = (successCallBack: (data?: Blog) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UpdateBlog"],
    mutationFn: (payload: Blog) => updateBlog(payload),
    onSuccess: (data) => {
      successCallBack(data.data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};

export default useUpdateBlog;
