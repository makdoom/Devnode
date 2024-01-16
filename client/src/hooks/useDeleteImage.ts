import { deleteImage } from "@/api/blogs";
import { useMutation } from "react-query";

const useDeleteImage = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationKey: ["DeleteImage"],
    mutationFn: (payload: { blogId: string; coverImagePublicId: string }) =>
      deleteImage(payload),
    onSuccess: () => {
      onSuccessCallback();
    },
  });
};

export default useDeleteImage;
