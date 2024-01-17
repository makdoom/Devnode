import { Blog, BlogPayload, BlogResponseType } from "@/types/blog.types";
import Axios from "./interceptor";

export const getBlogList = async () => {
  const response = await Axios.get<BlogResponseType>("/blog/get-blogs");
  return response.data;
};

export const createBlog = async (payload: BlogPayload) => {
  const response = await Axios.post("/blog/create-blog", payload);
  return response.data;
};

export const updateBlogImage = async (payload: { file: File; id: string }) => {
  const formData = new FormData();

  formData.append("coverImage", payload.file);
  formData.append("blogId", payload.id);

  const response = await Axios.post("/blog/update-image", formData);
  return response.data;
};

export const updateBlog = async (payload: Blog) => {
  const response = await Axios.post("/blog/update-blog", payload);
  return response.data;
};

export const deleteImage = async (payload: {
  blogId: string;
  coverImagePublicId: string;
}) => {
  const response = await Axios.post("/blog/delete-image", payload);
  return response.data;
};

export const deleteBlog = async (blogId: string) => {
  const response = await Axios.post("/blog/delete-blog", { blogId });
  return response.data;
};
