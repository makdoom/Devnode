import { createBlog } from "@/api/blogs";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "sonner";

export const useCreateBlog = (successCallback: (blogId: string) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createBlog"],
    mutationFn: (title: string) => createBlog({ title }),
    onSuccess: (data) => {
      toast.success("New blog created");
      successCallback(data.data._id);
    },
    onSettled: async (_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["getBlogs"] });
      }
    },
  });
};
