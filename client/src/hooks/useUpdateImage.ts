import { updateBlogImage } from "@/api/blogs";
import { useState } from "react";
import { useMutation } from "react-query";

const useUpdateImage = () => {
  const [uploadedFileImageURL, setUploadedFileImageURL] = useState("");

  const updateImageMutation = useMutation({
    mutationKey: ["UpdateImage"],
    mutationFn: (payload: { file: File; id: string }) =>
      updateBlogImage(payload),
    onSettled: (data: any) => {
      setUploadedFileImageURL(data.data?.coverImage);
    },
  });

  return {
    mutate: updateImageMutation.mutate,
    data: uploadedFileImageURL,
    isLoading: updateImageMutation.isLoading,
  };
};

export default useUpdateImage;
