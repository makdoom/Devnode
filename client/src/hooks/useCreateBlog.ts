import { createBlog } from "@/api/blogs";
import { BlogPayload } from "@/types/blog.types";
import { useMutation, useQueryClient } from "react-query";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CreateBlog"],
    mutationFn: (payload: BlogPayload) => createBlog(payload),
    onSuccess: () => {
      console.log("Blog Created");
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["GetBlogs"] });
      }
    },
  });
};
