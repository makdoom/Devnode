import { updateBlogCoverImage } from "@/api/blogs";
import { BlogPayload } from "@/types/blog.types";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

export const useUpdatedBlog = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UpdateBlog"],
    mutationFn: (payload: BlogPayload) => updateBlogCoverImage(payload),
    // onSuccess: () => {
    //   toast.success("New blog created");
    // },
    // onSettled: async (_, error) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["GetBlogs"] });
    //   }
    // },
  });
};
