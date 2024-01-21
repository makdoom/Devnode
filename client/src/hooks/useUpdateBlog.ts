import { updateBlog } from "@/api/blogs";
import { Blog } from "@/types/blog.types";
import { useMutation } from "react-query";

const useUpdateBlog = (successCallBack: () => void) => {
  return useMutation({
    mutationKey: ["UpdateBlog"],
    mutationFn: (payload: Blog) => updateBlog(payload),
    onSuccess: () => {
      successCallBack();
    },
  });
};

export default useUpdateBlog;
