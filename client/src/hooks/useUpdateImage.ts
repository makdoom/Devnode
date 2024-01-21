import { updateBlogImage } from "@/api/blogs";
import { CustomAxiosError } from "@/api/interceptor";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const useUpdateImage = (successCallback: (coverImageURL: string) => void) => {
  const [uploadedFileImageURL, setUploadedFileImageURL] = useState("");

  const updateImageMutation = useMutation({
    mutationKey: ["updateImage"],
    mutationFn: (payload: { file: File; id: string }) =>
      updateBlogImage(payload),
    onSuccess: (blogData) => {
      successCallback(blogData.data.coverImage);
    },
    onError: (error: CustomAxiosError) => {
      toast.error(error.response?.data.message);
    },
    onSettled: (blogData) => {
      setUploadedFileImageURL(blogData.data?.coverImage);
    },
  });

  return {
    mutate: updateImageMutation.mutate,
    data: uploadedFileImageURL,
    isLoading: updateImageMutation.isLoading,
  };
};

export default useUpdateImage;
