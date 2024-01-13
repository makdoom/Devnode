import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import { Blog } from "../models/blog.model";
import { CustomRequest } from "../types/custom.types";
import mongoose from "mongoose";

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

const getBlogs = asyncHandler(async (req: CustomRequest, res: Response) => {
  const blogList = await Blog.aggregate([
    {
      $match: {
        authorId: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "users", // the name of the users collection
        localField: "authorId",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: "$author",
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        title: 1,
        createdAt: 1,
        contents: 1,
        "author.fullName": 1,
        "author.email": 1,
      },
    },
  ]);

  console.log(blogList);
  res
    .status(201)
    .json(new ApiResponse(200, "Blog created successfully", blogList));
});

export { createBlog, getBlogs };
