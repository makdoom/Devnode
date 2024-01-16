import { updateBlog } from "@/api/blogs";
import { Blog } from "@/types/blog.types";
import { useState } from "react";
import { useMutation } from "react-query";

const useUpdateBlog = () => {
  const [updatedBlog, setUpdatedBlog] = useState();

  const mutation = useMutation({
    mutationKey: ["UpdateBlog"],
    mutationFn: (payload: Blog) => updateBlog(payload),
    onSettled: (data: any) => {
      console.log(data);
      setUpdatedBlog(data.data);
    },
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isLoading,
    data: updatedBlog,
  };
};

export default useUpdateBlog;
