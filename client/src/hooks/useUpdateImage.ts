import { updateBlogImage } from "@/api/blogs";
import { useMutation } from "react-query";

const useUpdateImage = () => {
  return useMutation({
    mutationKey: ["UpdateImage"],
    mutationFn: (payload: File) => updateBlogImage(payload),
  });
};

export default useUpdateImage;
