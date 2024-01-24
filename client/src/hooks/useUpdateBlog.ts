import { updateBlog } from "@/api/blogs";
import { Blog } from "@/types/blog.types";
import { useMutation, useQueryClient } from "react-query";

const useUpdateBlog = (successCallBack: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UpdateBlog"],
    mutationFn: (payload: Blog) => updateBlog(payload),
    onSuccess: () => {
      successCallBack();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
    },
  });
};

export default useUpdateBlog;
