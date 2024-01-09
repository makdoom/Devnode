import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import { Blog } from "../models/blog.model";
import { CustomRequest } from "../types/custom.types";

const createBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { title, contents } = req.body;

  // Create new blog post
  const createdBlogPost = await Blog.create({
    title,
    contents,
    authorId: req.user._id,
  });
  res
    .status(201)
    .json(new ApiResponse(200, "Blog created successfully", createdBlogPost));
});

export { createBlog };
