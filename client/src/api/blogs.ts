import { BlogPayload, BlogResponseType } from "@/types/blog.types";
import Axios from "./interceptor";

export const getBlogList = async () => {
  const response = await Axios.get<BlogResponseType>("/blog/get-blogs");
  return response.data;
};

export const createBlog = async (payload: BlogPayload) => {
  const response = await Axios.post("/blog/create-blog", payload);
  console.log(response);
  return response.data;
};

export const updateBlogCoverImage = async (payload: BlogPayload) => {
  const formData = new FormData();

  console.log("payload", payload);
  if (payload.coverImage) {
    formData.append("coverImage", payload.coverImage);
  }

  const response = await Axios.post("/blog/update-blog-cover-image", formData);
};
