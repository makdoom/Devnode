import { deleteBlog } from "@/api/blogs";
import { useMutation, useQueryClient } from "react-query";

const useDeleteBlog = (successCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DeleteBlog"],
    mutationFn: (blogId: string) => deleteBlog(blogId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      successCallback();
    },
  });
};

export default useDeleteBlog;
