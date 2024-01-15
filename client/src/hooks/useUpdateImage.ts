import { updateBlogImage } from "@/api/blogs";
import { useMutation } from "react-query";

const useUpdateImage = () => {
  return useMutation({
    mutationKey: ["UpdateImage"],
    mutationFn: (payload: { file: File; id: string }) =>
      updateBlogImage(payload),
  });
};

export default useUpdateImage;
