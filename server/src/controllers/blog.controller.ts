import { Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import ApiResponse from "../utils/ApiResponse";
import { Blog } from "../models/blog.model";
import { CustomRequest } from "../types/custom.types";
import mongoose from "mongoose";

const createBlog = asyncHandler(async (req: CustomRequest, res: Response) => {
  const {
    title,
    contents,
    subtitle,
    isDraft = true,
    isPublished = false,
  } = req.body;

  // Create new blog post
  const createdBlogPost = await Blog.create({
    title,
    contents,
    subtitle,
    isDraft,
    isPublished,
    author: req.user._id,
  });
  res
    .status(201)
    .json(new ApiResponse(200, "Blog created successfully", createdBlogPost));
});

const getBlogs = asyncHandler(async (req: CustomRequest, res: Response) => {
  const blogList = await Blog.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "users", // the name of the users collection
        localField: "author",
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
        subtitle: 1,
        contents: 1,
        tags: 1,
        coverImage: 1,
        createdAt: 1,
        isPublished: 1,
        isDraft: 1,
        "author.fullName": 1,
        "author.username": 1,
      },
    },
  ]);

  console.log(blogList);

  res
    .status(201)
    .json(new ApiResponse(200, "Blog fetched successfully", blogList));
});

export { createBlog, getBlogs };
